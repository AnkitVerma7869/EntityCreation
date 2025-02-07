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
import { Entity } from '../../interfaces/types';

interface TableListProps {
  onCreateNew?: () => void;
}

/**
 * TablesList Component
 * Displays a data grid of database tables with their properties and configurations.
 * Allows users to view, sort, filter and navigate to individual table details.
 */
export default function TablesList({ onCreateNew }: TableListProps) {
  const router = useRouter();
  const [tables, setTables] = useState<Entity[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState(true);

  /**
   * Handles row click events by navigating to the detailed view of the selected table
   */
  const handleRowClick = (params: GridRowParams) => {
    const entityName = params.row.entityName.toLowerCase();
    router.push(`/${entityName}`);
  };

  useEffect(() => {
    /**
     * Fetches table data from the API and formats it for display in the data grid
     */
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tables');
        const data = await response.json();
        
        // Define columns for the data grid
        const dynamicColumns: GridColDef[] = [
          { 
            field: 'id', 
            headerName: 'ID', 
            width: 70,
            filterable: true,
          },
          { 
            field: 'entityName', 
            headerName: 'Entity Name', 
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

        // Transform API data into the format expected by the data grid
        const formattedTables = data.tables.map((table: Entity, index: number) => ({
          id: index + 1,
          entityName: table.entityName,
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

      {/* Data Grid section with MUI DataGrid component */}
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