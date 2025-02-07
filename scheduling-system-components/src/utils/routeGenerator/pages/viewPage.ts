import { Entity } from '../../../interfaces/types';

export function generateViewPage(config: Entity) {
    return `
      'use client';
      import { useState, useEffect } from 'react';
      import { useRouter } from 'next/navigation';
      import { 
        DataGrid, 
        GridColDef,
        GridToolbar,
        GridPaginationModel 
      } from '@mui/x-data-grid';
      import { Box } from '@mui/material';
  
      export default function ${config.entityName.replace(/\s+/g, '')}ViewPage({
        params,
      }: {
        params: { id: string };
      }) {
        const [record, setRecord] = useState<any>(null);
        const [loading, setLoading] = useState(true);
        const router = useRouter();
  
        useEffect(() => {
          fetchRecord();
        }, [params.id]);
  
        const fetchRecord = async () => {
          try {
            const response = await fetch(\`/api/${config.entityName.toLowerCase()}/\${params.id}\`);
            const result = await response.json();
            if (result.success) {
              setRecord(result.data);
            }
          } catch (error) {
            console.error('Error fetching record:', error);
          } finally {
            setLoading(false);
          }
        };
  
        if (loading) return <div>Loading...</div>;
        if (!record) return <div>Record not found</div>;
  
        return (
          <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">${config.entityName} Details</h1>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Back
              </button>
            </div>
  
            <div className="bg-white shadow rounded-lg p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{record.id}</dd>
                </div>
                ${config.attributes.map(attr => `
                  <div>
                    <dt className="text-sm font-medium text-gray-500">${attr.name}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{record.${attr.name}}</dd>
                  </div>
                `).join('')}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(record.createdAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        );
      }
    `;
  }