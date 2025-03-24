'use client';

// Add ISR configuration
export const dynamic = 'force-dynamic';
export const revalidate = 1200; // Server-side revalidation only

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
import { useRouter, useSearchParams } from 'next/navigation';
import { Entity } from '../../interfaces/types';
import { Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface TableData {
  name: string;
  numberofcolumn: string;
  columnname: string;
  primarykeycolumnname: string;
  primarykeycolumndatatype: string;
}

interface TableListProps {
  initialData?: TableData[];
  onCreateNew?: () => void;
  token: string;
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
        <Loader2 className="h-8 w-8 animate-spin text-black" />
        <p className="text-black font-medium">Loading Tables...</p>
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
export default function TablesList({ initialData, onCreateNew, token }: TableListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tables, setTables] = useState<TableData[]>([]);
  const [columns] = useState<GridColDef[]>([
    { 
      field: 'name', 
      headerName: 'Table Name', 
      flex: 1,
      filterable: true,
      sortable: true,
      sortingOrder: ['asc', 'desc'],
    },
    { 
      field: 'numberofcolumn', 
      headerName: 'Total Fields', 
      flex: 1,
      filterable: true,
      sortable: true,
      sortingOrder: ['asc', 'desc'],
    }
  ]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

  const fetchTables = async () => {
    try {
      setLoading(true);
      setApiError(null);
      
      if (!API_URL) {
        setApiError('API URL is not configured');
        return;
      }

      const response = await fetch(`${API_URL}/api/v1/entity/all-entities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
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

      // Process the data to remove duplicates and ensure proper formatting
      if (data.success && Array.isArray(data.success.data)) {
        // Create a Map to store unique tables by name
        const uniqueTables = new Map();
        
        data.success.data.forEach((table: TableData) => {
          // Only add if we haven't seen this table name before
          if (!uniqueTables.has(table.name)) {
            uniqueTables.set(table.name, {
              ...table,
              id: table.name // Use table name as unique ID
            });
          }
        });

        // Convert Map values to array and sort by name
        const sortedTables = Array.from(uniqueTables.values())
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setTables(sortedTables);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      setApiError('Failed to fetch');
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [API_URL]);

  useEffect(() => {
    toast.dismiss();

    // Check localStorage instead of query params
    const storedEntity = localStorage.getItem('newEntity');
    
    if (storedEntity) {
      const { name, message } = JSON.parse(storedEntity);
      // Show migration in progress toast
      toast.success(
        `Migration is in progress,You can see your table in few seconds in the table list...`,
        { position: 'top-right', duration: 5000 }
      );
      
      // Show success message after delay
      // if (message) {
      //   setTimeout(() => {
      //     toast.success(message);
      //   }, 5500);
      // }

      // Clear the stored data
      localStorage.removeItem('newEntity');
    }
  }, []); // Run once on component mount

  const refreshData = async () => {
    await fetchTables();
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Available Tables</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your database tables and their configurations
          </p>
        </div>
        <button
          onClick={() => router.push('/entities/create')}
          className="px-4 py-2 bg-primary text-white rounded  transition-colors"
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
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: 'name', sort: 'asc' }],
              },
            }}
            sortingOrder={['asc', 'desc']}
            disableColumnMenu
            sx={{
              '& .MuiDataGrid-row': {
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