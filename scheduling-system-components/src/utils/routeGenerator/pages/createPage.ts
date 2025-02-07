import { Entity } from '../../../interfaces/types';
export function generateCreatePage(config: Entity) {
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

    export default function ${config.entityName.replace(/\s+/g, '')}CreatePage() {
      const [formData, setFormData] = useState<Record<string, any>>({});
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
          const response = await fetch(\`/api/${config.entityName.toLowerCase()}/create\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          if (result.success) {
            router.push(\`/${config.entityName.toLowerCase()}/list\`);
          }
        } catch (error) {
          console.error('Error creating record:', error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create ${config.entityName}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            ${config.attributes.map(attr => `
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ${attr.name}
                </label>
                <input
                  type="${attr.dataType.toLowerCase() === 'number' ? 'number' : 'text'}"
                  name="${attr.name}"
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    ['${attr.name.replace(/\s+/g, '_')}']: e.target.value 
                  })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            `).join('')}
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      );
    }
  `;
}