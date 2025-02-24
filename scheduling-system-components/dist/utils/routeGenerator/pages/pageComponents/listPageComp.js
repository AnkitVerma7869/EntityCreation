"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListPage = generateListPage;
function generateListPage(config) {
    // Filter out password fields from attributes
    var displayableAttributes = config.attributes.filter(function (attr) {
        return !attr.name.toLowerCase().includes('password') &&
            attr.inputType.toLowerCase() !== 'password';
    });
    var dateColumns = config.attributes
        .filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
        .some(function (type) { return attr.dataType.toLowerCase().includes(type); }); })
        .map(function (attr) { return "'".concat(attr.name, "'"); });
    return "\n'use client';\nimport { useEffect, useState } from 'react';\nimport { useRouter } from 'next/navigation';\nimport DefaultLayout from \"@/components/Layouts/DefaultLayout\";\nimport { use".concat(config.entityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\nimport { Edit, Trash2, Search, Plus, X } from 'lucide-react';\nimport { DataGrid, GridColDef, GridOverlay, gridClasses, GridToolbar } from '@mui/x-data-grid';\nimport Box from '@mui/material/Box';\nimport DeleteConfirmationModal from '@/components/models/DeleteConfirmationModal';\n\n// Helper function to format column headers\nfunction formatFieldLabel(name: string): string {\n  return name\n    .split(/[_\\s]+/)\n    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())\n    .join(' ');\n}\n    \nexport default function ").concat(config.entityName, "ListPage() {\n    const router = useRouter();\n    const { \n      loading, \n      error, \n      fetchRecords, \n      deleteRecord, \n      listParams,\n      totalRecords \n    } = use").concat(config.entityName, "Store();\n    \n    const [records, setRecords] = useState<any[]>([]);\n    const [searchTerm, setSearchTerm] = useState('');\n    const [page, setPage] = useState(1);\n    const [pageSize, setPageSize] = useState(10);\n    const [sortField, setSortField] = useState('created_at');\n    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');\n    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);\n    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);\n\n    const formatDateTime = (inputDate) => {\n      if (!inputDate) return \"\";\n      const date = new Date(inputDate.replace(\" \", \"T\")); // Convert \"YYYY-MM-DD HH:mm\" to ISO format\n      return date.toLocaleString(\"en-US\", {\n        month: \"2-digit\",\n        day: \"2-digit\",\n        year: \"numeric\",\n        hour: \"2-digit\",\n        minute: \"2-digit\",\n        hour12: true\n      });\n    };\n\n    const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n    useEffect(() => {\n      const fetchData = async () => {\n        const fetchedRecords = await fetchRecords({\n          page,\n          limit: pageSize,\n          sortBy: sortField,\n          orderBy: sortOrder,\n          search: searchTerm\n        });\n\n        const formattedRecords = fetchedRecords.map(record => {\n          const formattedRecord = { ...record };\n          DateFormatColumns.forEach(columnName => {\n            if (formattedRecord[columnName]) {\n              formattedRecord[columnName] = formatDateTime(formattedRecord[columnName]);\n            }\n          });\n          return formattedRecord;\n        });\n\n        setRecords(formattedRecords);\n      };\n\n      fetchData();\n    }, [page, pageSize, sortField, sortOrder, searchTerm]);\n\n    const handleEdit = (id: string) => {\n      router.push(`/").concat(config.entityName.toLowerCase(), "/edit/${id}`);\n    };\n\n    const openDeleteModal = (id: string) => {\n      setRecordToDelete(id);\n      setIsDeleteModalOpen(true);\n    };\n\n    const closeDeleteModal = () => {\n      setRecordToDelete(null);\n      setIsDeleteModalOpen(false);\n    };\n\n    const handleDelete = async () => {\n      if (recordToDelete) {\n        try {\n          await deleteRecord(recordToDelete);\n          // First update local state for immediate feedback\n          setRecords(prevRecords => prevRecords.filter(record => record.id !== recordToDelete));\n          // Then fetch fresh data from server\n          await fetchRecords({\n            page,\n            limit: pageSize,\n            sortBy: sortField,\n            orderBy: sortOrder,\n            search: searchTerm\n          });\n          // Close modal after everything is done\n          closeDeleteModal();\n        } catch (error) {\n          console.error('Error deleting record:', error);\n          // Optionally add error handling UI feedback here\n        }\n      }\n    };\n\n    const handleSearch = () => {\n      setPage(1);\n      fetchRecords({\n        search: searchTerm,\n        page: 1,\n        limit: pageSize,\n        sortBy: sortField,\n        orderBy: sortOrder\n      });\n    };\n\n    const CustomNoRowsOverlay = () => (\n      <GridOverlay>\n        <div className=\"text-center py-4\">\n          {error ? (\n            <p className=\"text-danger\">{error}</p>\n          ) : (\n            <p className=\"text-meta-1\">No records found for the selected criteria</p>\n          )}\n        </div>\n      </GridOverlay>\n    );\n\n    const columns: GridColDef[] = [\n      ").concat(displayableAttributes.map(function (attr, index) { return "{\n        field: '".concat(attr.name.replace(/\s+/g, '_'), "',\n        headerName: `${formatFieldLabel('").concat(attr.name, "')}`,\n        flex: 1,\n        ").concat(index === 0 ? "\n        renderCell: (params) => (\n          <div\n            className=\"cursor-pointer text-primary hover:underline\"\n            onClick={() => router.push(`/".concat(config.entityName.toLowerCase(), "/${params.row.id}`)}\n          >\n            {params.value}\n          </div>\n        ),\n        ") : '', "\n        ").concat(attr.dataType.toLowerCase() === 'number' ? "\n        type: 'number',\n        align: 'right',\n        headerAlign: 'right',\n        " : '', "\n        ").concat(attr.dataType.toLowerCase() === 'boolean' ? "\n        type: 'boolean',\n        " : '', "\n        ").concat(attr.dataType.toLowerCase() === 'date' ? "\n        type: 'date',\n        valueFormatter: (params) => {\n          if (!params.value) return '';\n          return formatDateTime(params.value);\n        },\n        " : '', "\n      }"); }).join(','), "\n      ,{\n        field: 'actions',\n        headerName: 'Actions',\n        width: 100,\n        sortable: false,\n        filterable: false,\n        disableColumnMenu: true,\n        renderCell: (params) => (\n          <div className=\"flex items-center space-x-3.5\">\n            <button\n              onClick={() => handleEdit(params.row.id)}\n              className=\"hover:text-primary\"\n            >\n              <Edit size={18} />\n            </button>\n            <button\n              onClick={() => openDeleteModal(params.row.id)}\n              className=\"hover:text-danger\"\n            >\n              <Trash2 size={18} />\n            </button>\n          </div>\n        )\n      }\n    ];\n\n    return (\n      <>\n        <DeleteConfirmationModal \n          isOpen={isDeleteModalOpen}\n          onClose={closeDeleteModal}\n          onConfirm={handleDelete}\n        />\n        <DefaultLayout>\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <div className=\"flex justify-between items-center\">\n                    <h3 className=\"font-medium text-black dark:text-white\">\n                      ").concat(config.entityName, " List\n                    </h3>\n                    <div className=\"flex gap-4\">\n                      <button\n                        onClick={() => router.push('/").concat(config.entityName.toLowerCase(), "/create')}\n                        className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 items-center gap-2\"\n                      >\n                        <Plus size={18} />\n                        Create New\n                      </button>\n                    </div>\n                  </div>\n                </div>\n\n                <div className=\"p-6.5\">\n                  <Box sx={{ height: 400, width: '100%' }}>\n                    <DataGrid\n                      rows={records}\n                      columns={columns}\n                      loading={loading}\n                      pagination\n                      paginationMode=\"server\"\n                      sortingMode=\"server\"\n                      rowCount={totalRecords}\n                      pageSizeOptions={[10, 25, 50]}\n                      paginationModel={{ page: page - 1, pageSize }}\n                      onPaginationModelChange={(model) => {\n                        setPage(model.page + 1);\n                        setPageSize(model.pageSize);\n                      }}\n                      onSortModelChange={(model) => {\n                        if (model.length) {\n                          setSortField(model[0].field);\n                          setSortOrder(model[0].sort as 'asc' | 'desc');\n                        }\n                      }}\n                      slots={{\n                        toolbar: GridToolbar,\n                        noRowsOverlay: CustomNoRowsOverlay\n                      }}\n                      slotProps={{\n                        toolbar: {\n                          showQuickFilter: true,\n                          quickFilterProps: {\n                            value: searchTerm,\n                            onChange: (event) => setSearchTerm(event.target.value),\n                          },\n                        },\n                      }}\n                      getRowHeight={() => 'auto'}\n                      sx={{\n                        [`& .${gridClasses.cell}`]: {\n                          py: 2,\n                        },\n                      }}\n                      disableColumnFilter\n                      disableColumnSelector\n                      disableDensitySelector\n                      disableRowSelectionOnClick\n                      getRowId={(row) => row.id}\n                    />\n                  </Box>\n                </div>\n              </div>\n            </div>\n          </div>\n        </DefaultLayout>\n      </>\n    );\n  }\n");
}
