import { Entity } from '../../../../interfaces/types';

export function generateListPage(config: Entity): string {
  // Filter out password fields from attributes
  const displayableAttributes = config.attributes.filter(attr => 
    !attr.name.toLowerCase().includes('password') && 
    attr.inputType.toLowerCase() !== 'password'
  );
  const dateColumns = config.attributes
    .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
      .some(type => attr.dataType.toLowerCase().includes(type)))
    .map(attr => `'${attr.name}'`);

  return `
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Edit, Trash2, Search, Plus, X } from 'lucide-react';
import { DataGrid, GridColDef, GridOverlay, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteConfirmationModal from '@/components/models/DeleteConfirmationModal';

// Helper function to format column headers
function formatFieldLabel(name: string): string {
  return name
    .split(/[_\\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
    
export default function ${config.entityName}ListPage() {
    const router = useRouter();
    const { 
      loading, 
      error, 
      fetchRecords, 
      deleteRecord, 
      listParams,
      totalRecords 
    } = use${config.entityName}Store();
    
    const [records, setRecords] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

    const formatDateTime = (inputDate) => {
      if (!inputDate) return "";
      const date = new Date(inputDate.replace(" ", "T")); // Convert "YYYY-MM-DD HH:mm" to ISO format
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    };

    const DateFormatColumns = [${dateColumns.join(', ')}];

    useEffect(() => {
      const fetchData = async () => {
        const fetchedRecords = await fetchRecords({
          page,
          limit: pageSize,
          sortBy: sortField,
          orderBy: sortOrder,
          search: searchTerm
        });

        const formattedRecords = fetchedRecords.map(record => {
          const formattedRecord = { ...record };
          DateFormatColumns.forEach(columnName => {
            if (formattedRecord[columnName]) {
              formattedRecord[columnName] = formatDateTime(formattedRecord[columnName]);
            }
          });
          return formattedRecord;
        });

        setRecords(formattedRecords);
      };

      fetchData();
    }, [page, pageSize, sortField, sortOrder, searchTerm]);

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
      if (recordToDelete) {
        try {
          await deleteRecord(recordToDelete);
          // First update local state for immediate feedback
          setRecords(prevRecords => prevRecords.filter(record => record.id !== recordToDelete));
          // Then fetch fresh data from server
          await fetchRecords({
            page,
            limit: pageSize,
            sortBy: sortField,
            orderBy: sortOrder,
            search: searchTerm
          });
          // Close modal after everything is done
          closeDeleteModal();
        } catch (error) {
          console.error('Error deleting record:', error);
          // Optionally add error handling UI feedback here
        }
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

    const CustomNoRowsOverlay = () => (
      <GridOverlay>
        <div className="text-center py-4">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <p className="text-meta-1">No records found for the selected criteria</p>
          )}
        </div>
      </GridOverlay>
    );

    const columns: GridColDef[] = [
      ${displayableAttributes.map((attr, index) => `{
        field: '${attr.name.replace(/\s+/g, '_')}',
        headerName: \`\${formatFieldLabel('${attr.name}')}\`,
        flex: 1,
        ${index === 0 ? `
        renderCell: (params) => (
          <div
            className="cursor-pointer text-primary hover:underline"
            onClick={() => router.push(\`/${config.entityName.toLowerCase()}/\${params.row.id}\`)}
          >
            {params.value}
          </div>
        ),
        ` : ''}
        ${attr.dataType.toLowerCase() === 'number' ? `
        type: 'number',
        align: 'right',
        headerAlign: 'right',
        ` : ''}
        ${attr.dataType.toLowerCase() === 'boolean' ? `
        type: 'boolean',
        ` : ''}
        ${attr.dataType.toLowerCase() === 'date' ? `
        type: 'date',
        valueFormatter: (params) => {
          if (!params.value) return '';
          return formatDateTime(params.value);
        },
        ` : ''}
      }`).join(',')}
      ,{
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => handleEdit(params.row.id)}
              className="hover:text-primary"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => openDeleteModal(params.row.id)}
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
        <DefaultLayout>
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-black dark:text-white">
                      ${config.entityName} List
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
                      getRowId={(row) => row.id}
                    />
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }
`
} 