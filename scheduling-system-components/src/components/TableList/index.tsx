// Add ISR configuration
export const dynamic = 'force-dynamic';
export const revalidate = 7200; // Server-side revalidation only

/**
 * TableList Module
 * Provides a data grid interface for managing and viewing database tables
 */

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

/**
 * Props interface for TableList component
 * @interface TableListProps
 */
interface TableListProps {
  onCreateNew?: () => void;  // Optional callback when creating new table
}

/**
 * Custom loading overlay component for the data grid
 * Displays a spinning loader with loading message
 * @returns {JSX.Element} Loading overlay component
 */
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

/**
 * Custom error overlay component for the data grid
 * Displays error messages with appropriate formatting
 * @param {Object} props - Component props
 * @param {string | null} props.message - Error message to display
 * @returns {JSX.Element} Error overlay component
 */
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
 * Features ISR for improved performance and data freshness.
 * 
 * Features:
 * - Pagination
 * - Sorting
 * - Filtering
 * - Error handling
 * - Loading states
 * 
 * @param {TableListProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function TablesList({ onCreateNew }: TableListProps) {
  // State management
  const router = useRouter();
  const [tables, setTables] = useState<Entity[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // API configuration
  const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

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
          field: 'name', 
          headerName: 'Table Name', 
          flex: 1,
          filterable: true,
          sortable: true,
        },
        { 
          field: 'numberofcolumn', 
          headerName: 'Total Fields', 
          flex: 1,
          filterable: true,
          sortable: true,
        }
      ];
      
      setColumns(dynamicColumns);

      if (data.success && Array.isArray(data.success.data)) {
        const formattedTables = data.success.data.map((table: any) => ({
          id: table.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0),
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

  /**
   * Handles row click events by navigating to the detailed view of the selected table
   * @param {GridRowParams} params - Data grid row parameters
   */
  const handleRowClick = (params: GridRowParams) => {
    const entityName = params.row.name ? params.row.name.toLowerCase() : params.row.entityName.toLowerCase();
    router.push(`/${entityName}`);
  };

  // Single useEffect for data fetching
  useEffect(() => {
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
            pageSizeOptions={[10, 25, 50]}
            loading={loading}
            disableRowSelectionOnClick
            autoHeight={!loading}
            onRowClick={handleRowClick}
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