import { Entity } from '../../../interfaces/types';

export function generateEditPage(config: Entity) {
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

    interface Record {
      id: string | number;
      ${config.attributes.map(attr => 
        `${attr.name.replace(/\s+/g, '_')}: ${attr.dataType.toLowerCase() === 'number' ? 'number' : 'string'};`
      ).join('\n      ')}
      createdAt?: string;
    }

    export default function ${config.entityName.replace(/\s+/g, '')}EditPage() {
      const [record, setRecord] = useState<Record | null>(null);
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const router = useRouter();

      useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        if (id) fetchRecord(id);
      }, []);

      const fetchRecord = async (id: string) => {
        try {
          const response = await fetch(\`/api/${config.entityName.toLowerCase()}/\${id}\`);
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

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
          const response = await fetch(\`/api/${config.entityName.toLowerCase()}/edit\`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
          });

          const result = await response.json();
          if (result.success) {
            router.push(\`/${config.entityName.toLowerCase()}/list\`);
          }
        } catch (error) {
          console.error('Error updating record:', error);
        } finally {
          setSaving(false);
        }
      };

      if (loading) return <div>Loading...</div>;
      if (!record) return <div>Record not found</div>;

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit ${config.entityName}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            ${config.attributes.map(attr => `
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ${attr.name}
                </label>
                <input
                  type="${attr.dataType.toLowerCase() === 'number' ? 'number' : 'text'}"
                  value={record?.${attr.name.replace(/\s+/g, '_')} || ''}
                  onChange={(e) => setRecord(prev => ({ 
                    ...prev!, 
                    ${attr.name.replace(/\s+/g, '_')}: e.target.value 
                  }))}
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
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      );
    }
  `;
}