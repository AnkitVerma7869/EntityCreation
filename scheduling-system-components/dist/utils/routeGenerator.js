"use strict";
//This is dummy code for now
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTableRoutes = generateTableRoutes;
/**
 * Generates and saves all necessary routes for a table
 * @param config - Configuration for the table including name and attributes
 * @returns Promise resolving to the API response
 */
function generateTableRoutes(config) {
    return __awaiter(this, void 0, void 0, function () {
        var routes, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    routes = {
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
                    console.log('calling generate-routes inside routeGenerator.ts:');
                    return [4 /*yield*/, fetch('/api/generate-routes', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                entityName: config.entityName,
                                attributes: config.attributes,
                                routes: routes
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Inside generateTableRoutes Response:', response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    if (!result.success) {
                        throw new Error(result.error || 'Failed to generate routes');
                    }
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error generating routes:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function generateListPage(config) {
    return "\n    'use client';\n    import { useState, useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { \n      DataGrid, \n      GridColDef,\n      GridToolbar,\n      GridPaginationModel,\n      GridRenderCellParams\n    } from '@mui/x-data-grid';\n    import { Box } from '@mui/material';\n\n    interface Record {\n      id: string | number;\n      ".concat(config.attributes.map(function (attr) {
        return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(attr.dataType.toLowerCase() === 'number' ? 'number' : 'string', ";");
    }).join('\n      '), "\n      createdAt?: string;\n    }\n\n    export default function ").concat(config.entityName.replace(/\s+/g, ''), "ListPage() {\n      const [records, setRecords] = useState<Record[]>([]);\n      const [loading, setLoading] = useState(true);\n      const router = useRouter();\n      const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({\n        pageSize: 10,\n        page: 0,\n      });\n\n      useEffect(() => {\n        fetchRecords();\n      }, []);\n\n      const fetchRecords = async () => {\n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/list`);\n          const result = await response.json();\n          if (result.success) {\n            const recordsWithIds = (result.data.records || []).map((record: any) => ({\n              ...record,\n              id: record.id || Date.now() + Math.random(),\n            }));\n            setRecords(recordsWithIds);\n          }\n        } catch (error) {\n          console.error('Error fetching records:', error);\n        } finally {\n          setLoading(false);\n        }\n      };\n\n      const handleDelete = async (id: string) => {\n        if (!confirm('Are you sure you want to delete this record?')) return;\n        \n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/delete?id=${id}`, {\n            method: 'DELETE',\n          });\n          const result = await response.json();\n          if (result.success) {\n            fetchRecords();\n          }\n        } catch (error) {\n          console.error('Error deleting record:', error);\n        }\n      };\n\n      const columns: GridColDef[] = [\n        { \n          field: 'id', \n          headerName: 'ID', \n          width: 90,\n          filterable: true,\n        },\n        ").concat(config.attributes
        .filter(function (attr) { return attr.name.toLowerCase() !== 'id'; })
        .map(function (attr) { return "\n          { \n            field: '".concat(attr.name.replace(/\s+/g, '_'), "', \n            headerName: '").concat(attr.name, "',\n            flex: 1,\n            filterable: true,\n            sortable: true,\n          },\n        "); }).join(''), "\n        { \n          field: 'createdAt', \n          headerName: 'Created At', \n          width: 180,\n          filterable: true,\n          valueFormatter: (params) => {\n            if (!params.value) return '';\n            return new Date(params.value).toLocaleString();\n          },\n        },\n        {\n          field: 'actions',\n          headerName: 'Actions',\n          width: 200,\n          sortable: false,\n          filterable: false,\n          renderCell: (params) => (\n            <div className=\"space-x-2\">\n              <button\n                onClick={(e) => {\n                  e.stopPropagation();\n                  router.push(`/").concat(config.entityName.toLowerCase(), "/${params.row.id}`);\n                }}\n                className=\"px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600\"\n              >\n                View\n              </button>\n              <button\n                onClick={(e) => {\n                  e.stopPropagation();\n                  router.push(`/").concat(config.entityName.toLowerCase(), "/edit?id=${params.row.id}`);\n                }}\n                className=\"px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600\"\n              >\n                Edit\n              </button>\n              <button\n                onClick={(e) => {\n                  e.stopPropagation();\n                  handleDelete(params.row.id);\n                }}\n                className=\"px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600\"\n              >\n                Delete\n              </button>\n            </div>\n          ),\n        },\n      ];\n\n      return (\n        <div className=\"p-6\">\n          <div className=\"flex justify-between items-center mb-6\">\n            <h1 className=\"text-2xl font-bold\">").concat(config.entityName, " List</h1>\n            <button\n              onClick={() => router.push(`/").concat(config.entityName.toLowerCase(), "/create`)}\n              className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600\"\n            >\n              Create New\n            </button>\n          </div>\n\n          <Box sx={{ height: 600, width: '100%' }}>\n            <DataGrid\n              rows={records}\n              columns={columns}\n              paginationModel={paginationModel}\n              onPaginationModelChange={setPaginationModel}\n              pageSizeOptions={[10, 25, 50]}\n              loading={loading}\n              disableRowSelectionOnClick\n              slots={{ toolbar: GridToolbar }}\n              slotProps={{\n                toolbar: {\n                  showQuickFilter: true,\n                  quickFilterProps: { debounceMs: 500 },\n                },\n              }}\n              initialState={{\n                sorting: {\n                  sortModel: [{ field: 'createdAt', sort: 'desc' }],\n                },\n              }}\n            />\n          </Box>\n        </div>\n      );\n    }\n  ");
}
function generateCreatePage(config) {
    return "\n    'use client';\n    import { useState, useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { \n      DataGrid, \n      GridColDef,\n      GridToolbar,\n      GridPaginationModel \n    } from '@mui/x-data-grid';\n    import { Box } from '@mui/material';\n\n    export default function ".concat(config.entityName.replace(/\s+/g, ''), "CreatePage() {\n      const [formData, setFormData] = useState<Record<string, any>>({});\n      const [loading, setLoading] = useState(false);\n      const router = useRouter();\n\n      const handleSubmit = async (e: React.FormEvent) => {\n        e.preventDefault();\n        setLoading(true);\n\n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/create`, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json',\n            },\n            body: JSON.stringify(formData),\n          });\n\n          const result = await response.json();\n          if (result.success) {\n            router.push(`/").concat(config.entityName.toLowerCase(), "/list`);\n          }\n        } catch (error) {\n          console.error('Error creating record:', error);\n        } finally {\n          setLoading(false);\n        }\n      };\n\n      return (\n        <div className=\"p-6 max-w-2xl mx-auto\">\n          <h1 className=\"text-2xl font-bold mb-6\">Create ").concat(config.entityName, "</h1>\n          \n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n            ").concat(config.attributes.map(function (attr) { return "\n              <div>\n                <label className=\"block text-sm font-medium text-gray-700 mb-1\">\n                  ".concat(attr.name, "\n                </label>\n                <input\n                  type=\"").concat(attr.dataType.toLowerCase() === 'number' ? 'number' : 'text', "\"\n                  name=\"").concat(attr.name, "\"\n                  onChange={(e) => setFormData({ \n                    ...formData, \n                    ['").concat(attr.name.replace(/\s+/g, '_'), "']: e.target.value \n                  })}\n                  className=\"w-full p-2 border rounded-md\"\n                  required\n                />\n              </div>\n            "); }).join(''), "\n            \n            <div className=\"flex gap-2\">\n              <button\n                type=\"button\"\n                onClick={() => router.back()}\n                className=\"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600\"\n              >\n                Cancel\n              </button>\n              <button\n                type=\"submit\"\n                disabled={loading}\n                className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300\"\n              >\n                {loading ? 'Creating...' : 'Create'}\n              </button>\n            </div>\n          </form>\n        </div>\n      );\n    }\n  ");
}
function generateEditPage(config) {
    return "\n    'use client';\n    import { useState, useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { \n      DataGrid, \n      GridColDef,\n      GridToolbar,\n      GridPaginationModel \n    } from '@mui/x-data-grid';\n    import { Box } from '@mui/material';\n\n    interface Record {\n      id: string | number;\n      ".concat(config.attributes.map(function (attr) {
        return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(attr.dataType.toLowerCase() === 'number' ? 'number' : 'string', ";");
    }).join('\n      '), "\n      createdAt?: string;\n    }\n\n    export default function ").concat(config.entityName.replace(/\s+/g, ''), "EditPage() {\n      const [record, setRecord] = useState<Record | null>(null);\n      const [loading, setLoading] = useState(true);\n      const [saving, setSaving] = useState(false);\n      const router = useRouter();\n\n      useEffect(() => {\n        const searchParams = new URLSearchParams(window.location.search);\n        const id = searchParams.get('id');\n        if (id) fetchRecord(id);\n      }, []);\n\n      const fetchRecord = async (id: string) => {\n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/${id}`);\n          const result = await response.json();\n          if (result.success) {\n            setRecord(result.data);\n          }\n        } catch (error) {\n          console.error('Error fetching record:', error);\n        } finally {\n          setLoading(false);\n        }\n      };\n\n      const handleSubmit = async (e: React.FormEvent) => {\n        e.preventDefault();\n        setSaving(true);\n\n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/edit`, {\n            method: 'PUT',\n            headers: {\n              'Content-Type': 'application/json',\n            },\n            body: JSON.stringify(record),\n          });\n\n          const result = await response.json();\n          if (result.success) {\n            router.push(`/").concat(config.entityName.toLowerCase(), "/list`);\n          }\n        } catch (error) {\n          console.error('Error updating record:', error);\n        } finally {\n          setSaving(false);\n        }\n      };\n\n      if (loading) return <div>Loading...</div>;\n      if (!record) return <div>Record not found</div>;\n\n      return (\n        <div className=\"p-6 max-w-2xl mx-auto\">\n          <h1 className=\"text-2xl font-bold mb-6\">Edit ").concat(config.entityName, "</h1>\n          \n          <form onSubmit={handleSubmit} className=\"space-y-4\">\n            ").concat(config.attributes.map(function (attr) { return "\n              <div>\n                <label className=\"block text-sm font-medium text-gray-700 mb-1\">\n                  ".concat(attr.name, "\n                </label>\n                <input\n                  type=\"").concat(attr.dataType.toLowerCase() === 'number' ? 'number' : 'text', "\"\n                  value={record?.").concat(attr.name.replace(/\s+/g, '_'), " || ''}\n                  onChange={(e) => setRecord(prev => ({ \n                    ...prev!, \n                    ").concat(attr.name.replace(/\s+/g, '_'), ": e.target.value \n                  }))}\n                  className=\"w-full p-2 border rounded-md\"\n                  required\n                />\n              </div>\n            "); }).join(''), "\n            \n            <div className=\"flex gap-2\">\n              <button\n                type=\"button\"\n                onClick={() => router.back()}\n                className=\"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600\"\n              >\n                Cancel\n              </button>\n              <button\n                type=\"submit\"\n                disabled={saving}\n                className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300\"\n              >\n                {saving ? 'Saving...' : 'Save'}\n              </button>\n            </div>\n          </form>\n        </div>\n      );\n    }\n  ");
}
function generateViewPage(config) {
    return "\n    'use client';\n    import { useState, useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { \n      DataGrid, \n      GridColDef,\n      GridToolbar,\n      GridPaginationModel \n    } from '@mui/x-data-grid';\n    import { Box } from '@mui/material';\n\n    export default function ".concat(config.entityName.replace(/\s+/g, ''), "ViewPage({\n      params,\n    }: {\n      params: { id: string };\n    }) {\n      const [record, setRecord] = useState<any>(null);\n      const [loading, setLoading] = useState(true);\n      const router = useRouter();\n\n      useEffect(() => {\n        fetchRecord();\n      }, [params.id]);\n\n      const fetchRecord = async () => {\n        try {\n          const response = await fetch(`/api/").concat(config.entityName.toLowerCase(), "/${params.id}`);\n          const result = await response.json();\n          if (result.success) {\n            setRecord(result.data);\n          }\n        } catch (error) {\n          console.error('Error fetching record:', error);\n        } finally {\n          setLoading(false);\n        }\n      };\n\n      if (loading) return <div>Loading...</div>;\n      if (!record) return <div>Record not found</div>;\n\n      return (\n        <div className=\"p-6 max-w-2xl mx-auto\">\n          <div className=\"flex justify-between items-center mb-6\">\n            <h1 className=\"text-2xl font-bold\">").concat(config.entityName, " Details</h1>\n            <button\n              onClick={() => router.back()}\n              className=\"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600\"\n            >\n              Back\n            </button>\n          </div>\n\n          <div className=\"bg-white shadow rounded-lg p-6\">\n            <dl className=\"space-y-4\">\n              <div>\n                <dt className=\"text-sm font-medium text-gray-500\">ID</dt>\n                <dd className=\"mt-1 text-sm text-gray-900\">{record.id}</dd>\n              </div>\n              ").concat(config.attributes.map(function (attr) { return "\n                <div>\n                  <dt className=\"text-sm font-medium text-gray-500\">".concat(attr.name, "</dt>\n                  <dd className=\"mt-1 text-sm text-gray-900\">{record.").concat(attr.name, "}</dd>\n                </div>\n              "); }).join(''), "\n              <div>\n                <dt className=\"text-sm font-medium text-gray-500\">Created At</dt>\n                <dd className=\"mt-1 text-sm text-gray-900\">\n                  {new Date(record.createdAt).toLocaleString()}\n                </dd>\n              </div>\n            </dl>\n          </div>\n        </div>\n      );\n    }\n  ");
}
function generateListApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    const getTablePath = () => path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n\n    export async function GET() {\n      // ... copy the list API implementation\n    }\n  ");
}
function generateTestFolder(config) {
    return "\n    // Test files for ".concat(config.entityName, "\n  ");
}
function generateCreateApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    export async function POST(request: Request) {\n      try {\n        const body = await request.json();\n        const filePath = path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n        const fileContent = await fs.readFile(filePath, 'utf-8');\n        const tableData = JSON.parse(fileContent);\n        \n        const newRecord = {\n          id: Date.now(),\n          ...body,\n          createdAt: new Date().toISOString()\n        };\n        \n        const records = tableData.records || [];\n        records.push(newRecord);\n        \n        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));\n        return NextResponse.json({ success: true, data: newRecord });\n      } catch (error) {\n        return NextResponse.json({ success: false, error: 'Failed to create record' }, { status: 500 });\n      }\n    }\n  ");
}
function generateEditApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    export async function PUT(request: Request) {\n      try {\n        const body = await request.json();\n        const filePath = path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n        const fileContent = await fs.readFile(filePath, 'utf-8');\n        const tableData = JSON.parse(fileContent);\n        \n        const records = tableData.records || [];\n        const index = records.findIndex((r: any) => r.id === body.id);\n        if (index === -1) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });\n        \n        records[index] = { ...records[index], ...body, updatedAt: new Date().toISOString() };\n        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));\n        return NextResponse.json({ success: true, data: records[index] });\n      } catch (error) {\n        return NextResponse.json({ success: false, error: 'Failed to update record' }, { status: 500 });\n      }\n    }\n  ");
}
function generateViewApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    export async function GET(request: Request, { params }: { params: { id: string } }) {\n      try {\n        const filePath = path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n        const fileContent = await fs.readFile(filePath, 'utf-8');\n        const tableData = JSON.parse(fileContent);\n        \n        const record = (tableData.records || []).find((r: any) => r.id.toString() === params.id);\n        if (!record) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });\n        \n        return NextResponse.json({ success: true, data: record });\n      } catch (error) {\n        return NextResponse.json({ success: false, error: 'Failed to fetch record' }, { status: 500 });\n      }\n    }\n  ");
}
function generateDeleteApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    export async function DELETE(request: Request) {\n      try {\n        const { searchParams } = new URL(request.url);\n        const id = searchParams.get('id');\n        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });\n\n        const filePath = path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n        const fileContent = await fs.readFile(filePath, 'utf-8');\n        const tableData = JSON.parse(fileContent);\n        \n        const records = tableData.records || [];\n        const index = records.findIndex((r: any) => r.id.toString() === id);\n        if (index === -1) return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });\n        \n        records.splice(index, 1);\n        await fs.writeFile(filePath, JSON.stringify({ ...tableData, records }, null, 2));\n        return NextResponse.json({ success: true });\n      } catch (error) {\n        return NextResponse.json({ success: false, error: 'Failed to delete record' }, { status: 500 });\n      }\n    }\n  ");
}
