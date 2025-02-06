'use client';
import React, { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridRowParams
} from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TableData, Table } from '../../types';

interface TableListProps {
  onCreateNew?: () => void;
}

export default function TablesList({ onCreateNew }: TableListProps) {
  const router = useRouter();
  const [tables, setTables] = useState<Table[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleRowClick = (params: GridRowParams) => {
    const tableName = params.row.tableName.toLowerCase();
    router.push(`/${tableName}`);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tables');
        const data = await response.json();
        
        const dynamicColumns: GridColDef[] = [
          { 
            field: 'id', 
            headerName: 'ID', 
            width: 70,
            filterable: true,
          },
          { 
            field: 'tableName', 
            headerName: 'Table Name', 
            flex: 1,
            filterable: true,
            sortable: true,
          },
          { 
            field: 'totalFields', 
            headerName: 'Total Fields', 
            width: 120,
            filterable: true,
            sortable: true,
          },
          {
            field: 'attributes',
            headerName: 'Attributes',
            flex: 2,
            filterable: true,
            sortable: true,
            renderCell: (params) => (
              <div className="overflow-hidden text-ellipsis">
                {params.value}
              </div>
            ),
          }
        ];
        
        setColumns(dynamicColumns);

        const formattedTables = data.tables.map((table: TableData, index: number) => ({
          id: index + 1,
          tableName: table.tableName,
          totalFields: table.attributes.length,
          attributes: table.attributes.map(attr => `${attr.name} (${attr.dataType})`).join(', '),
        }));
        
        setTables(formattedTables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Tables</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your database tables and their configurations
          </p>
        </div>
        <button
          onClick={() => router.push('/entities/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New 
        </button>
      </div>

      {/* Data Grid */}
      <Paper elevation={2} className="p-4">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={tables}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            loading={loading}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
              sorting: {
                sortModel: [{ field: 'tableName', sort: 'asc' }],
              },
            }}
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
            }}
          />
        </Box>
      </Paper>
    </div>
  );
} 