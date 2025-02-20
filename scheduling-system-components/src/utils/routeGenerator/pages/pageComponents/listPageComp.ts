import { Entity } from '../../../../interfaces/types';

export function generateListPage(config: Entity): string {
  return `
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { Eye, Trash2, Search, Plus } from 'lucide-react';
import { DataGrid, GridColDef, GridOverlay, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
    
export default function ${config.entityName}ListPage() {
    const router = useRouter();
    const { 
      records, 
      loading, 
      error, 
      fetchRecords, 
      deleteRecord, 
      listParams,
      totalRecords 
    } = use${config.entityName}Store();
      
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
      fetchRecords({
        page,
        limit: pageSize,
        sortBy: sortField,
        orderBy: sortOrder,
        search: searchTerm
      });
    }, [page, pageSize, sortField, sortOrder, searchTerm]);

    const handleEdit = (id: string) => {
      router.push(\`/${config.entityName.toLowerCase()}/edit/\${id}\`);
    };

    const handleDelete = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this record?')) {
        await deleteRecord(id);
        fetchRecords({
          page,
          limit: pageSize,
          sortBy: sortField,
          orderBy: sortOrder,
          search: searchTerm
        });
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
        ${config.attributes.map(attr => `{
          field: '${attr.name.replace(/\s+/g, '_')}',
          headerName: '${attr.name}',
          flex: 1,
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
            return formatDateTime(params.value); // Format the date and time
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
                <Eye size={18} />
              </button>
              <button
                onClick={() => handleDelete(params.row.id)}
                className="hover:text-danger"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )
        }
      ];

      return (
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
      );
    }
  `;
} 