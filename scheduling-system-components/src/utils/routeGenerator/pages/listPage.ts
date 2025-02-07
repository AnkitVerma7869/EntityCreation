import { Entity } from '../../../interfaces/types';

export function generateListPage(config: Entity) {
  return `
    'use client';
    import { useState, useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { 
      DataGrid, 
      GridColDef,
      GridToolbar,
      GridPaginationModel,
      GridRenderCellParams
    } from '@mui/x-data-grid';
    import { Box } from '@mui/material';

    interface Record {
      id: string | number;
      ${config.attributes.map(attr => 
        `${attr.name.replace(/\s+/g, '_')}: ${attr.dataType.toLowerCase() === 'number' ? 'number' : 'string'};`
      ).join('\n      ')}
      createdAt?: string;
    }

    export default function ${config.entityName.replace(/\s+/g, '')}ListPage() {
      const [records, setRecords] = useState<Record[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const router = useRouter();

      useEffect(() => {
        fetchRecords();
      }, []);

      const fetchRecords = async () => {
        try {
          const response = await fetch('/api/${config.entityName.toLowerCase()}/list');
          const result = await response.json();
          if (result.success) {
            setRecords(result.data);
          } else {
            setError(result.error || 'Failed to fetch records');
          }
        } catch (err) {
          setError('Failed to fetch records');
        } finally {
          setLoading(false);
        }
      };

      const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        
        try {
          const response = await fetch(\`/api/${config.entityName.toLowerCase()}/delete?id=\${id}\`, {
            method: 'DELETE'
          });
          const result = await response.json();
          if (result.success) {
            fetchRecords();
          } else {
            alert(result.error || 'Failed to delete record');
          }
        } catch (err) {
          alert('Failed to delete record');
        }
      };

      const columns: GridColDef[] = [
        ${config.attributes.map(attr => `
          {
            field: '${attr.name.replace(/\s+/g, '_')}',
            headerName: '${attr.name}',
            flex: 1
          }`
        ).join(',')}
        ,{
          field: 'actions',
          headerName: 'Actions',
          flex: 1,
          renderCell: (params: GridRenderCellParams) => (
            <div className="flex gap-2">
              <button
                onClick={() => router.push(\`/${config.entityName.toLowerCase()}/view/\${params.row.id}\`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => router.push(\`/${config.entityName.toLowerCase()}/edit/\${params.row.id}\`)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(params.row.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )
        }
      ];

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">${config.entityName} List</h1>
            <button
              onClick={() => router.push(\`/${config.entityName.toLowerCase()}/create\`)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create New
            </button>
          </div>

          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={records}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      );
    }
  `;
}