'use client';
import React, { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridRowParams,
  GridOverlay,
  GridLoadingOverlay
} from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Entity } from '../../interfaces/types';
import { Loader2 } from 'lucide-react';

interface TableListProps {
  onCreateNew?: () => void;
}

// Custom Loading Overlay with better visibility
const CustomLoadingOverlay = () => (
  <GridOverlay>
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-blue-600 font-medium">Loading Tables...</p>
      </div>
    </div>
  </GridOverlay>
);

// Custom Error Overlay Component
const CustomErrorOverlay = (props: { message: string | null }) => (
  <GridOverlay>
    <div className="text-center p-4">
      <div className="text-red-600 font-semibold">
        {props.message === 'Failed to fetch' 
          ? 'Unable to connect to server. Please check your connection.'
          : props.message}
      </div>
    </div>
  </GridOverlay>
);

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
  const [apiError, setApiError] = useState<string | null>(null);

  // API endpoint from environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

  /**
   * Handles row click events by navigating to the detailed view of the selected table
   */
  const handleRowClick = (params: GridRowParams) => {
    const entityName = params.row.name ? params.row.name.toLowerCase() : params.row.entityName.toLowerCase();
    router.push(`/${entityName}`);
  };

  useEffect(() => {
    /**
     * Fetches table data from the API and formats it for display in the data grid
     */
    const fetchTables = async () => {
      try {
        setLoading(true);
        setApiError(null);
        
        if (!API_URL) {
          setApiError('API URL is not configured');
          return;
        }

        const response = await fetch(`${API_URL}/api/v1/entity/all-entities`);
        
        if (!response.ok) {
          const errorData = await response.json();
          setApiError(errorData.message || 'Failed to fetch data');
          setTables([]);
          return;
        }

        const data = await response.json();
        
        if (data.error) {
          setApiError(data.error);
          setTables([]);
          return;
        }

        // Define columns for the data grid
        const dynamicColumns: GridColDef[] = [
          { 
            field: 'id', 
            headerName: 'ID', 
            width: 70,
            filterable: true,
          },
          { 
            field: 'name', 
            headerName: 'Table Name', 
            flex: 1,
            filterable: true,
            sortable: true,
            renderCell: (params) => (
              <div 
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => {
                  const entityName = params.row.name.toLowerCase();
                  router.push(`/${entityName}`);
                }}
              >
                {params.value}
              </div>
            )
          },
          { 
            field: 'numberofcolumn', 
            headerName: 'Total Fields', 
            width: 120,
            filterable: true,
            sortable: true,
          }
        ];
        
        setColumns(dynamicColumns);

        if (data.success && Array.isArray(data.success.data)) {
          const formattedTables = data.success.data.map((table: any, index: number) => ({
            id: index + 1,
            name: table.name,
            numberofcolumn: table.numberofcolumn
          }));
          
          setTables(formattedTables);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
        setApiError('Failed to fetch');
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [API_URL]);

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

      <Paper elevation={2} className="p-4">
        <Box sx={{ 
          width: '100%', 
          minHeight: '400px', 
          display: 'flex',
          flexDirection: 'column'
        }}>
          <DataGrid
            rows={tables}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight={!loading}
            slots={{
              toolbar: GridToolbar,
              loadingOverlay: CustomLoadingOverlay,
              noRowsOverlay: apiError ? () => <CustomErrorOverlay message={apiError} /> : undefined,
            }}
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
                sortModel: [{ field: 'id', sort: 'asc' }],
              },
            }}
            sortingOrder={['asc', 'desc']}
            disableColumnMenu
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
              minHeight: '300px',
              flex: 1,
              '& .MuiDataGrid-main': {
                minHeight: '300px'
              }
            }}
          />
        </Box>
      </Paper>
    </div>
  );
}