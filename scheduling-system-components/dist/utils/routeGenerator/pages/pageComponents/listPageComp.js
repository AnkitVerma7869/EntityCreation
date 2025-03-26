"use strict";
/**
 * List Page Component Generator
 * Generates a React component for displaying and managing entity records in a data grid
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListPage = generateListPage;
var packageManager_1 = require("../../utils/packageManager");
/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 *
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name) {
    return name
        .replace(/[-\s]+/g, '_')
        .split('_')
        .map(function (word, index) {
        var capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
        .join('');
}
/**
 * Checks if the entity has a custom primary key
 *
 * @param {Entity} config - Entity configuration
 * @returns {boolean} True if a custom primary key exists
 */
function hasCustomPrimaryKey(config) {
    return config.attributes.some(function (attr) { return attr.constraints.includes('primary key'); });
}
/**
 * Gets the primary key field name if it exists
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Primary key field name or 'id' as default
 */
function getPrimaryKeyField(config) {
    var primaryKeyAttr = config.attributes.find(function (attr) { return attr.constraints.includes('primary key'); });
    return primaryKeyAttr ? primaryKeyAttr.name.replace(/\s+/g, '_') : 'id';
}
/**
 * Generates a list page component for an entity
 * Includes data grid, search, pagination, sorting, and CRUD operations
 *
 * Features:
 * - Server-side pagination and sorting
 * - Search functionality
 * - Date formatting
 * - Edit and delete actions
 * - Responsive grid layout
 * - Loading states
 * - Error handling
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
function generateListPage(config) {
    var packages = (0, packageManager_1.generatePackageImports)(config, { list: true }).packages;
    var formattedEntityName = formatEntityName(config.entityName);
    // Filter out sensitive and non-displayable fields
    var displayableAttributes = config.attributes.filter(function (attr) {
        return !attr.name.toLowerCase().includes('password') &&
            attr.inputType.toLowerCase() !== 'password' &&
            attr.displayInList !== false;
    });
    // Extract date columns for special formatting
    var dateColumns = config.attributes
        .filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
        .some(function (type) { return attr.dataType.toLowerCase().includes(type); }); })
        .map(function (attr) { return "'".concat(attr.name, "'"); });
    // Check if entity has a custom primary key
    var hasCustomPK = hasCustomPrimaryKey(config);
    var primaryKeyField = getPrimaryKeyField(config);
    return "\n'use client';\nimport { useEffect, useState } from 'react';\nimport { useRouter } from 'next/navigation';\nimport { use".concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\nimport { Edit, Trash2, Search, Plus, X } from 'lucide-react';\nimport { DataGrid, GridColDef, GridOverlay, gridClasses, GridToolbar } from '@mui/x-data-grid';\nimport Box from '@mui/material/Box';\nimport DeleteConfirmationModal from '@/components/models/DeleteConfirmationModal';\nimport { toast } from 'react-hot-toast';\n\n/**\n * Formats a field name for display in column headers\n * Example: \"user_name\" -> \"User Name\"\n * \n * @param {string} name - Raw field name\n * @returns {string} Formatted display name\n */\nfunction formatFieldLabel(name: string): string {\n  return name\n    .split(/[_\\s]+/)\n    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())\n    .join(' ');\n}\n    \n/**\n * List Page Component for ").concat(formattedEntityName, "\n * Provides a data grid interface for viewing and managing ").concat(formattedEntityName, " records\n */\nexport default function ").concat(formattedEntityName, "ListPage() {\n    const router = useRouter();\n    const { \n      loading, \n      error, \n      fetchRecords, \n      deleteRecord, \n      listParams,\n      totalRecords \n    } = use").concat(formattedEntityName, "Store();\n    \n    // State management\n    const [records, setRecords] = useState<any[]>([]);\n    const [searchTerm, setSearchTerm] = useState('');\n    const [page, setPage] = useState(1);\n    const [pageSize, setPageSize] = useState(10);\n    const [sortField, setSortField] = useState('").concat(hasCustomPK ? primaryKeyField : 'created_at', "');\n    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');\n    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);\n    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);\n\n    // Define the primary key field to use for record identification\n    const primaryKeyField = '").concat(primaryKeyField, "';\n\n    /**\n     * Formats date and time for displayRE\n     * @param {string | Date} inputDate - Raw date input\n     * @returns {string} Formatted date string\n     */\n    const formatDateTime = (inputDate: string | Date): string => {\n      if (!inputDate) return \"\";\n      try {\n        const date = typeof inputDate === 'string' \n          ? new Date(inputDate.replace(\" \", \"T\"))\n          : inputDate;\n\n        if (isNaN(date.getTime())) return \"Invalid Date\";\n\n        return date.toLocaleString(\"en-US\", {\n          month: \"2-digit\",\n          day: \"2-digit\",\n          year: \"numeric\",\n          hour: \"2-digit\",\n          minute: \"2-digit\",\n          hour12: true\n        });\n      } catch (error) {\n        console.error('Error formatting date:', error);\n        return \"Invalid Date\";\n      }\n    };\n\n    // List of columns that need date formatting\n    const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n    /**\n     * Fetches and formats records from the API\n     * Handles date formatting for date columns\n     */\n    useEffect(() => {\n      const fetchData = async () => {\n        try {\n          const fetchedRecords = await fetchRecords({\n            page,\n            limit: pageSize,\n            sortBy: sortField,\n            orderBy: sortOrder,\n            search: searchTerm\n          });\n\n          if (error) {\n            // Error is already set in the store\n            return;\n          }\n\n          const formattedRecords = fetchedRecords.map(record => {\n            const formattedRecord = { ...record };\n            DateFormatColumns.forEach(columnName => {\n              if (formattedRecord[columnName]) {\n                formattedRecord[columnName] = formatDateTime(new Date(formattedRecord[columnName]));\n              }\n            });\n            return formattedRecord;\n          });\n\n          // Update records state with the new data\n          setRecords(formattedRecords);\n        } catch (err) {\n          console.error('Error in fetchData:', error);\n          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch records';\n          toast.error(errorMessage);      }\n      };\n\n      fetchData();\n    }, [page, pageSize, sortField, sortOrder, searchTerm]);\n\n    /**\n     * Navigation handler for editing records\n     * @param {string} id - Record ID to edit\n     */\n    const handleEdit = (id: string) => {\n      router.push(`/").concat(config.entityName.toLowerCase(), "/edit/${id}`);\n    };\n\n    const openDeleteModal = (id: string) => {\n      setRecordToDelete(id);\n      setIsDeleteModalOpen(true);\n    };\n\n    const closeDeleteModal = () => {\n      setRecordToDelete(null);\n      setIsDeleteModalOpen(false);\n    };\n\n    const handleDelete = async () => {\n      if (!recordToDelete) return;\n\n      try {\n        console.log('Deleting record with ID:', recordToDelete, 'using primary key field:', primaryKeyField);\n        const result = await deleteRecord(recordToDelete);\n        \n        if (result.success) {\n          // Show success message\n          toast.success(result.success);\n          // Close modal after successful deletion\n          closeDeleteModal();\n          \n          // Remove the deleted record from the current records\n          setRecords(prevRecords => {\n            console.log('Filtering records by', primaryKeyField, '!=', recordToDelete);\n            return prevRecords.filter(record => record[primaryKeyField] !== recordToDelete);\n          });\n          \n          // If this was the last record on the current page and not the first page,\n          // go to the previous page\n          if (records.length === 1 && page > 1) {\n            setPage(prev => prev - 1);\n          }\n          \n          // Refresh the data from the server\n          await fetchRecords({\n            page: records.length === 1 && page > 1 ? page - 1 : page,\n            limit: pageSize,\n            sortBy: sortField,\n            orderBy: sortOrder,\n            search: searchTerm\n          });\n        } else if (result.error) {\n          console.error('Delete error:', result.error);\n          // Throw error to be caught by the modal\n          throw new Error(result.error);\n        }\n      } catch (error) {\n        console.error('Exception during delete:', error);\n        // Re-throw the error to be handled by the modal\n        throw error;\n      }\n    };\n\n    const handleSearch = () => {\n      setPage(1);\n      fetchRecords({\n        search: searchTerm,\n        page: 1,\n        limit: pageSize,\n        sortBy: sortField,\n        orderBy: sortOrder\n      });\n    };\n\n    /**\n     * Custom overlay component for empty grid state\n     * Displays error message or no records message\n     */\n    const CustomNoRowsOverlay = () => (\n      <GridOverlay>\n        <div className=\"flex flex-col items-center justify-center py-4\">\n          {error ? (\n            <div className=\"text-center\">\n              <p className=\"text-danger font-medium mb-2\">{error}</p>\n              <button\n                onClick={() => {\n                  setSearchTerm('');\n                  setPage(1);\n                  fetchRecords({\n                    page: 1,\n                    limit: pageSize,\n                    sortBy: sortField,\n                    orderBy: sortOrder,\n                    search: ''\n                  });\n                }}\n                className=\"text-primary hover:text-primary-dark underline\"\n              >\n                Try Again\n              </button>\n            </div>\n          ) : (\n            <p className=\"text-meta-1\">No records found for the selected criteria</p>\n          )}\n        </div>\n      </GridOverlay>\n    );\n\n    /**\n     * Column definitions for the data grid\n     * Includes field configuration, formatting, and action buttons\n     */\n    const columns: GridColDef[] = [\n      ").concat(displayableAttributes.map(function (attr) {
        var baseColumn = "{\n          field: '".concat(attr.name.replace(/\s+/g, '_'), "',\n          headerName: formatFieldLabel('").concat(attr.name, "'),\n          flex: 1,\n          sortable: true,\n          disableColumnMenu: true\n        }");
        // First column gets the click handler
        if (attr === displayableAttributes[0]) {
            return "{\n            ...".concat(baseColumn, ",\n            renderCell: (params) => (\n              <div\n                className=\"cursor-pointer text-primary hover:underline\"\n                onClick={() => router.push(`/").concat(config.entityName.toLowerCase(), "/${params.row[primaryKeyField]}`)}\n              >\n                {params.value}\n              </div>\n            )\n          }");
        }
        // Handle different data types
        switch (attr.dataType.toLowerCase()) {
            case 'date':
                return "{\n              ...".concat(baseColumn, ",\n              width: 110,\n              resizable: false,\n              headerAlign: 'left',\n              align: 'left',\n              renderCell: (params) => {\n                if (!params.row['").concat(attr.name, "']) return '';\n                const date = new Date(params.row['").concat(attr.name, "']);\n                return date.toLocaleDateString('en-US', {\n                  year: 'numeric',\n                  month: 'short',\n                  day: 'numeric'\n                });\n              }\n            }");
            case 'datetime':
            case 'timestamp':
                return "{\n              ...".concat(baseColumn, ",\n              width: 160,\n              resizable: false,\n              headerAlign: 'left',\n              align: 'left',\n              renderCell: (params) => {\n                if (!params.row['").concat(attr.name, "']) return '';\n                const date = new Date(params.row['").concat(attr.name, "']);\n                return date.toLocaleString('en-US', {\n                  year: 'numeric',\n                  month: 'short',\n                  day: 'numeric',\n                  hour: '2-digit',\n                  minute: '2-digit',\n                  hour12: true\n                });\n              }\n            }");
            case 'time':
                return "{\n              ...".concat(baseColumn, ",\n              width: 100,\n              resizable: false,\n              headerAlign: 'left',\n              align: 'left',\n              renderCell: (params) => {\n                if (!params.row.").concat(attr.name, ") return '';\n                const time = new Date(`1970-01-01T${params.row.").concat(attr.name, "}`);\n                return time.toLocaleTimeString('en-US', {\n                  hour: '2-digit',\n                  minute: '2-digit',\n                  hour12: true\n                });\n              }\n            }");
            case 'number':
            case 'decimal':
            case 'float':
            case 'integer':
                return "{\n              ...".concat(baseColumn, ",\n              type: 'number',\n              align: 'left',\n              headerAlign: 'left'\n            }");
            case 'boolean':
                return "{\n              ...".concat(baseColumn, ",\n              type: 'boolean',\n              align: 'left',\n              headerAlign: 'left'\n            }");
            default:
                return baseColumn;
        }
    }).join(',\n        '), ",\n      {\n        field: 'actions',\n        headerName: 'Actions',\n        width: 100,\n        sortable: false,\n        filterable: false,\n        disableColumnMenu: true,\n        renderCell: (params) => (\n          <div className=\"flex items-center space-x-3.5\">\n            <button\n              onClick={() => handleEdit(params.row[primaryKeyField])}\n              className=\"hover:text-primary\"\n            >\n              <Edit size={18} />\n            </button>\n            <button\n              onClick={() => openDeleteModal(params.row[primaryKeyField])}\n              className=\"hover:text-danger\"\n            >\n              <Trash2 size={18} />\n            </button>\n          </div>\n        )\n      }\n    ];\n\n    return (\n      <>\n        <DeleteConfirmationModal \n          isOpen={isDeleteModalOpen}\n          onClose={closeDeleteModal}\n          onConfirm={handleDelete}\n        />\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <div className=\"flex justify-between items-center\">\n                    <h3 className=\"text-xl font-bold text-black dark:text-white\">\n                      ").concat(formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1), " List\n                    </h3>\n                    <div className=\"flex gap-4\">\n                      <button\n                        onClick={() => router.push('/").concat(config.entityName.toLowerCase(), "/create')}\n                        className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 items-center gap-2\"\n                      >\n                        <Plus size={18} />\n                        Create New\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div className=\"p-6.5\">\n                  <Box sx={{ height: 400, width: '100%' }}>\n                    <DataGrid\n                      rows={records}\n                      columns={columns}\n                      loading={loading}\n                      pagination\n                      paginationMode=\"server\"\n                      sortingMode=\"server\"\n                      rowCount={totalRecords}\n                      pageSizeOptions={[10, 25, 50]}\n                      paginationModel={{ page: page - 1, pageSize }}\n                      onPaginationModelChange={(model) => {\n                        setPage(model.page + 1);\n                        setPageSize(model.pageSize);\n                      }}\n                      onSortModelChange={(model) => {\n                        if (model.length) {\n                          setSortField(model[0].field);\n                          setSortOrder(model[0].sort as 'asc' | 'desc');\n                        }\n                      }}\n                      slots={{\n                        toolbar: GridToolbar,\n                        noRowsOverlay: CustomNoRowsOverlay\n                      }}\n                      slotProps={{\n                        toolbar: {\n                          showQuickFilter: true,\n                          quickFilterProps: {\n                            value: searchTerm,\n                            onChange: (event) => setSearchTerm(event.target.value),\n                          },\n                        },\n                      }}\n                      getRowHeight={() => 'auto'}\n                      sx={{\n                        [`& .${gridClasses.cell}`]: {\n                          py: 2,\n                        },\n                      }}\n                      disableColumnFilter\n                      disableColumnSelector\n                      disableDensitySelector\n                      disableRowSelectionOnClick\n                      getRowId={(row) => row[primaryKeyField]}\n                      sortingOrder={['desc', 'asc']}\n                      autoHeight\n                    />\n                  </Box>\n                </div>\n              </div>\n            </div>\n          </div>\n      </>\n    );\n  }\n");
}
function formatFieldLabel(name) {
    throw new Error('Function not implemented.');
}
