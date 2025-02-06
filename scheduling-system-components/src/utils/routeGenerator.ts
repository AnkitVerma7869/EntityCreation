//This is dummy code for now


//for now, we ar generating the routes

import { TableConfig } from '../types';

export async function generateTableRoutes(config: TableConfig) {
  try {
    const routes = {
      pages: {
        list: generateListPage(config),
        create: generateCreatePage(config),
        edit: generateEditPage(config),
        view: generateViewPage(config)
      },
      api: {
        list: generateListApi(config),
        create: generateCreateApi(config),
        edit: generateEditApi(config),
        view: generateViewApi(config),
        delete: generateDeleteApi(config)
      }
    };

    const response = await fetch('/api/generate-routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableName: config.tableName,
        attributes: config.attributes,
        routes
      }),
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to generate routes');
    }
    return result;
  } catch (error: any) {
    console.error('Error generating routes:', error);
    return { success: false, error: error?.message || 'Unknown error occurred' };
  }
}

function generateListPage(config: TableConfig) {
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

    export default function ${config.tableName.replace(/\s+/g, '')}ListPage() {
      const [records, setRecords] = useState<Record[]>([]);
      const [loading, setLoading] = useState(true);
      const router = useRouter();
      const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 10,
        page: 0,
      });

      useEffect(() => {
        fetchRecords();
      }, []);

      const fetchRecords = async () => {
        try {
          const response = await fetch(\`/api/${config.tableName}/list\`);
          const result = await response.json();
          if (result.success) {
            const recordsWithIds = (result.data.records || []).map((record: any) => ({
              ...record,
              id: record.id || Date.now() + Math.random(),
            }));
            setRecords(recordsWithIds);
          }
        } catch (error) {
          console.error('Error fetching records:', error);
        } finally {
          setLoading(false);
        }
      };

      const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        
        try {
          const response = await fetch(\`/api/${config.tableName}/delete?id=\${id}\`, {
            method: 'DELETE',
          });
          const result = await response.json();
          if (result.success) {
            fetchRecords();
          }
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      };

      const columns: GridColDef[] = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 90,
          filterable: true,
        },
        ${config.attributes
          .filter(attr => attr.name.toLowerCase() !== 'id')
          .map(attr => `
          { 
            field: '${attr.name.replace(/\s+/g, '_')}', 
            headerName: '${attr.name}',
            flex: 1,
            filterable: true,
            sortable: true,
          },
        `).join('')}
        { 
          field: 'createdAt', 
          headerName: 'Created At', 
          width: 180,
          filterable: true,
          valueFormatter: (params) => {
            if (!params.value) return '';
            return new Date(params.value).toLocaleString();
          },
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 200,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <div className="space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(\`/${config.tableName}/\${params.row.id}\`);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(\`/${config.tableName}/edit?id=\${params.row.id}\`);
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(params.row.id);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ),
        },
      ];

      return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">${config.tableName} List</h1>
            <button
              onClick={() => router.push(\`/${config.tableName}/create\`)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create New
            </button>
          </div>

          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={records}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]}
              loading={loading}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'createdAt', sort: 'desc' }],
                },
              }}
            />
          </Box>
        </div>
      );
    }
  `;
}

function generateCreatePage(config: TableConfig) {
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

    export default function ${config.tableName.replace(/\s+/g, '')}CreatePage() {
      const [formData, setFormData] = useState<Record<string, any>>({});
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
          const response = await fetch(\`/api/${config.tableName}/create\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          if (result.success) {
            router.push(\`/${config.tableName}/list\`);
          }
        } catch (error) {
          console.error('Error creating record:', error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create ${config.tableName}</h1>
          
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

function generateEditPage(config: TableConfig) {
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

    export default function ${config.tableName.replace(/\s+/g, '')}EditPage() {
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
          const response = await fetch(\`/api/${config.tableName}/\${id}\`);
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
          const response = await fetch(\`/api/${config.tableName}/edit\`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
          });

          const result = await response.json();
          if (result.success) {
            router.push(\`/${config.tableName}/list\`);
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
          <h1 className="text-2xl font-bold mb-6">Edit ${config.tableName}</h1>
          
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

function generateViewPage(config: TableConfig) {
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

    export default function ${config.tableName.replace(/\s+/g, '')}ViewPage({
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
          const response = await fetch(\`/api/${config.tableName}/\${params.id}\`);
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
            <h1 className="text-2xl font-bold">${config.tableName} Details</h1>
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

function generateListApi(config: TableConfig) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    const getTablePath = () => path.join(process.cwd(), 'tables', '${config.tableName.toLowerCase()}.json');

    export async function GET() {
      // ... copy the list API implementation
    }
  `;
}

function generateTestFolder(config: TableConfig) {
  return `
    // Test files for ${config.tableName}
  `;
}

function generateCreateApi(config: TableConfig) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    export async function POST(request: Request) {
      try {
        const body = await request.json();
        const filePath = path.join(process.cwd(), 'tables', '${config.tableName.toLowerCase()}.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableData = JSON.parse(fileContent);
        
        const newRecord = {
          id: Date.now(),
          ...body,
          createdAt: new Date().toISOString()
        };
        
        const records = tableData.records || [];
        records.push(newRecord);
        
        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));
        return NextResponse.json({ success: true, data: newRecord });
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create record' }, { status: 500 });
      }
    }
  `;
}

function generateEditApi(config: TableConfig) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    export async function PUT(request: Request) {
      try {
        const body = await request.json();
        const filePath = path.join(process.cwd(), 'tables', '${config.tableName.toLowerCase()}.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableData = JSON.parse(fileContent);
        
        const records = tableData.records || [];
        const index = records.findIndex((r: any) => r.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
        
        records[index] = { ...records[index], ...body, updatedAt: new Date().toISOString() };
        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));
        return NextResponse.json({ success: true, data: records[index] });
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update record' }, { status: 500 });
      }
    }
  `;
}

function generateViewApi(config: TableConfig) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    export async function GET(request: Request, { params }: { params: { id: string } }) {
      try {
        const filePath = path.join(process.cwd(), 'tables', '${config.tableName.toLowerCase()}.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableData = JSON.parse(fileContent);
        
        const record = (tableData.records || []).find((r: any) => r.id.toString() === params.id);
        if (!record) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: record });
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch record' }, { status: 500 });
      }
    }
  `;
}

function generateDeleteApi(config: TableConfig) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    export async function DELETE(request: Request) {
      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        const filePath = path.join(process.cwd(), 'tables', '${config.tableName.toLowerCase()}.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const tableData = JSON.parse(fileContent);
        
        const records = tableData.records || [];
        const index = records.findIndex((r: any) => r.id.toString() === id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
        
        records.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));
        return NextResponse.json({ success: true });
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete record' }, { status: 500 });
      }
    }
  `;
} 