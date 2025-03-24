/**
 * List Page Component Generator
 * Generates a React component for displaying and managing entity records in a data grid
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';

/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 * 
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name: string): string {
  return name
    .replace(/[-\s]+/g, '_')
    .split('_')
    .map((word, index) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
function hasCustomPrimaryKey(config: Entity): boolean {
  return config.attributes.some(attr => attr.constraints.includes('primary key'));
}

/**
 * Gets the primary key field name if it exists
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Primary key field name or 'id' as default
 */
function getPrimaryKeyField(config: Entity): string {
  const primaryKeyAttr = config.attributes.find(attr => attr.constraints.includes('primary key'));
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
export function generateListPage(config: Entity): string {
  const { packages } = generatePackageImports(config, { list: true });
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Filter out sensitive and non-displayable fields
  const displayableAttributes = config.attributes.filter(attr => 
    !attr.name.toLowerCase().includes('password') && 
    attr.inputType.toLowerCase() !== 'password' &&
    attr.displayInList !== false
  );

  // Extract date columns for special formatting
  const dateColumns = config.attributes
    .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
      .some(type => attr.dataType.toLowerCase().includes(type)))
    .map(attr => `'${attr.name}'`);
    
  // Check if entity has a custom primary key
  const hasCustomPK = hasCustomPrimaryKey(config);
  const primaryKeyField = getPrimaryKeyField(config);

  return `
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Edit, Trash2, Search, Plus, X } from 'lucide-react';
import { DataGrid, GridColDef, GridOverlay, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteConfirmationModal from '@/components/models/DeleteConfirmationModal';
import { toast } from 'react-hot-toast';

/**
 * Formats a field name for display in column headers
 * Example: "user_name" -> "User Name"
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted display name
 */
function formatFieldLabel(name: string): string {
  return name
    .split(/[_\\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
    
/**
 * List Page Component for ${formattedEntityName}
 * Provides a data grid interface for viewing and managing ${formattedEntityName} records
 */
export default function ${formattedEntityName}ListPage() {
    const router = useRouter();
    const { 
      loading, 
      error, 
      fetchRecords, 
      deleteRecord, 
      listParams,
      totalRecords 
    } = use${formattedEntityName}Store();
    
    // State management
    const [records, setRecords] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortField, setSortField] = useState('${hasCustomPK ? primaryKeyField : 'created_at'}');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

    // Define the primary key field to use for record identification
    const primaryKeyField = '${primaryKeyField}';

    /**
     * Formats date and time for displayRE
     * @param {string | Date} inputDate - Raw date input
     * @returns {string} Formatted date string
     */
    const formatDateTime = (inputDate: string | Date): string => {
      if (!inputDate) return "";
      try {
        const date = typeof inputDate === 'string' 
          ? new Date(inputDate.replace(" ", "T"))
          : inputDate;

        if (isNaN(date.getTime())) return "Invalid Date";

        return date.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return "Invalid Date";
      }
    };

    // List of columns that need date formatting
    const DateFormatColumns = [${dateColumns.join(', ')}];

    /**
     * Fetches and formats records from the API
     * Handles date formatting for date columns
     */
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedRecords = await fetchRecords({
            page,
            limit: pageSize,
            sortBy: sortField,
            orderBy: sortOrder,
            search: searchTerm
          });

          if (error) {
            // Error is already set in the store
            return;
          }

          const formattedRecords = fetchedRecords.map(record => {
            const formattedRecord = { ...record };
            DateFormatColumns.forEach(columnName => {
              if (formattedRecord[columnName]) {
                formattedRecord[columnName] = formatDateTime(new Date(formattedRecord[columnName]));
              }
            });
            return formattedRecord;
          });

          // Update records state with the new data
          setRecords(formattedRecords);
        } catch (err) {
          console.error('Error in fetchData:', error);
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch records';
          toast.error(errorMessage);      }
      };

      fetchData();
    }, [page, pageSize, sortField, sortOrder, searchTerm]);

    /**
     * Navigation handler for editing records
     * @param {string} id - Record ID to edit
     */
    const handleEdit = (id: string) => {
      router.push(\`/${config.entityName.toLowerCase()}/edit/\${id}\`);
    };

    const openDeleteModal = (id: string) => {
      setRecordToDelete(id);
      setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setRecordToDelete(null);
      setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
      if (!recordToDelete) return;

      try {
        console.log('Deleting record with ID:', recordToDelete, 'using primary key field:', primaryKeyField);
        const result = await deleteRecord(recordToDelete);
        
        if (result.success) {
          // Show success message
          toast.success(result.success);
          // Close modal after successful deletion
          closeDeleteModal();
          
          // Remove the deleted record from the current records
          setRecords(prevRecords => {
            console.log('Filtering records by', primaryKeyField, '!=', recordToDelete);
            return prevRecords.filter(record => record[primaryKeyField] !== recordToDelete);
          });
          
          // If this was the last record on the current page and not the first page,
          // go to the previous page
          if (records.length === 1 && page > 1) {
            setPage(prev => prev - 1);
          }
          
          // Refresh the data from the server
          await fetchRecords({
            page: records.length === 1 && page > 1 ? page - 1 : page,
            limit: pageSize,
            sortBy: sortField,
            orderBy: sortOrder,
            search: searchTerm
          });
        } else if (result.error) {
          console.error('Delete error:', result.error);
          // Throw error to be caught by the modal
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Exception during delete:', error);
        // Re-throw the error to be handled by the modal
        throw error;
      }
    };

    const handleSearch = () => {
      setPage(1);
      fetchRecords({
        search: searchTerm,
        page: 1,
        limit: pageSize,
        sortBy: sortField,
        orderBy: sortOrder
      });
    };

    /**
     * Custom overlay component for empty grid state
     * Displays error message or no records message
     */
    const CustomNoRowsOverlay = () => (
      <GridOverlay>
        <div className="flex flex-col items-center justify-center py-4">
          {error ? (
            <div className="text-center">
              <p className="text-danger font-medium mb-2">{error}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPage(1);
                  fetchRecords({
                    page: 1,
                    limit: pageSize,
                    sortBy: sortField,
                    orderBy: sortOrder,
                    search: ''
                  });
                }}
                className="text-primary hover:text-primary-dark underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <p className="text-meta-1">No records found for the selected criteria</p>
          )}
        </div>
      </GridOverlay>
    );

    /**
     * Column definitions for the data grid
     * Includes field configuration, formatting, and action buttons
     */
    const columns: GridColDef[] = [
      ${displayableAttributes.map((attr) => {
        const baseColumn = `{
          field: '${attr.name.replace(/\s+/g, '_')}',
          headerName: formatFieldLabel('${attr.name}'),
          flex: 1,
          sortable: true,
          disableColumnMenu: true
        }`;

        // First column gets the click handler
        if (attr === displayableAttributes[0]) {
          return `{
            ...${baseColumn},
            renderCell: (params) => (
              <div
                className="cursor-pointer text-primary hover:underline"
                onClick={() => router.push(\`/${config.entityName.toLowerCase()}/\${params.row[primaryKeyField]}\`)}
              >
                {params.value}
              </div>
            )
          }`;
        }

        // Handle different data types
        switch (attr.dataType.toLowerCase()) {
          case 'date':
            return `{
              ...${baseColumn},
              width: 110,
              resizable: false,
              headerAlign: 'left',
              align: 'left',
              renderCell: (params) => {
                if (!params.row['${attr.name}']) return '';
                const date = new Date(params.row['${attr.name}']);
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
              }
            }`;

          case 'datetime':
          case 'timestamp':
            return `{
              ...${baseColumn},
              width: 160,
              resizable: false,
              headerAlign: 'left',
              align: 'left',
              renderCell: (params) => {
                if (!params.row['${attr.name}']) return '';
                const date = new Date(params.row['${attr.name}']);
                return date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                });
              }
            }`;

          case 'time':
            return `{
              ...${baseColumn},
              width: 100,
              resizable: false,
              headerAlign: 'left',
              align: 'left',
              renderCell: (params) => {
                if (!params.row.${attr.name}) return '';
                const time = new Date(\`1970-01-01T\${params.row.${attr.name}}\`);
                return time.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                });
              }
            }`;

          case 'number':
          case 'decimal':
          case 'float':
          case 'integer':
            return `{
              ...${baseColumn},
              type: 'number',
              align: 'left',
              headerAlign: 'left'
            }`;

          case 'boolean':
            return `{
              ...${baseColumn},
              type: 'boolean',
              align: 'left',
              headerAlign: 'left'
            }`;

          default:
            return baseColumn;
        }
      }).join(',\n        ')},
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => handleEdit(params.row[primaryKeyField])}
              className="hover:text-primary"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => openDeleteModal(params.row[primaryKeyField])}
              className="hover:text-danger"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )
      }
    ];

    return (
      <>
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
        />
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      ${formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1)} List
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => router.push('/${config.entityName.toLowerCase()}/create')}
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90 items-center gap-2"
                      >
                        <Plus size={18} />
                        Create New
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6.5">
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={records}
                      columns={columns}
                      loading={loading}
                      pagination
                      paginationMode="server"
                      sortingMode="server"
                      rowCount={totalRecords}
                      pageSizeOptions={[10, 25, 50]}
                      paginationModel={{ page: page - 1, pageSize }}
                      onPaginationModelChange={(model) => {
                        setPage(model.page + 1);
                        setPageSize(model.pageSize);
                      }}
                      onSortModelChange={(model) => {
                        if (model.length) {
                          setSortField(model[0].field);
                          setSortOrder(model[0].sort as 'asc' | 'desc');
                        }
                      }}
                      slots={{
                        toolbar: GridToolbar,
                        noRowsOverlay: CustomNoRowsOverlay
                      }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: {
                            value: searchTerm,
                            onChange: (event) => setSearchTerm(event.target.value),
                          },
                        },
                      }}
                      getRowHeight={() => 'auto'}
                      sx={{
                        [\`& .\${gridClasses.cell}\`]: {
                          py: 2,
                        },
                      }}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      disableRowSelectionOnClick
                      getRowId={(row) => row[primaryKeyField]}
                      sortingOrder={['desc', 'asc']}
                      autoHeight
                    />
                  </Box>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
`
} 

function formatFieldLabel(name: string) {
  throw new Error('Function not implemented.');
}