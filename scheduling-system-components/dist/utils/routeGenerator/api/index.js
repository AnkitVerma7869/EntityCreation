"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiRoutes = void 0;
// Base API generator function that all specific API generators will use
var generateBaseApi = function (config, operation) { return "\n  import { NextResponse } from 'next/server';\n  import fs from 'fs/promises';\n  import path from 'path';\n\n  const getTablePath = () => path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n"); };
// Generate List API route
var generateListApi = function (config) { return "\n  ".concat(generateBaseApi(config, 'list'), "\n\n  export async function GET() {\n    try {\n      const data = await fs.readFile(getTablePath(), 'utf-8');\n      return NextResponse.json(JSON.parse(data));\n    } catch (error) {\n      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });\n    }\n  }\n"); };
// Generate Create API route
var generateCreateApi = function (config) { return "\n  ".concat(generateBaseApi(config, 'create'), "\n\n  export async function POST(request: Request) {\n    try {\n      const body = await request.json();\n      const data = await fs.readFile(getTablePath(), 'utf-8');\n      const records = JSON.parse(data);\n      records.push({ id: Date.now(), ...body });\n      await fs.writeFile(getTablePath(), JSON.stringify(records, null, 2));\n      return NextResponse.json({ success: true });\n    } catch (error) {\n      return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });\n    }\n  }\n"); };
// Generate Edit API route
var generateEditApi = function (config) { return "\n  ".concat(generateBaseApi(config, 'edit'), "\n\n  export async function PUT(request: Request) {\n    try {\n      const body = await request.json();\n      const data = await fs.readFile(getTablePath(), 'utf-8');\n      const records = JSON.parse(data);\n      const index = records.findIndex((record: any) => record.id === body.id);\n      if (index === -1) {\n        return NextResponse.json({ error: 'Record not found' }, { status: 404 });\n      }\n      records[index] = { ...records[index], ...body };\n      await fs.writeFile(getTablePath(), JSON.stringify(records, null, 2));\n      return NextResponse.json({ success: true });\n    } catch (error) {\n      return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });\n    }\n  }\n"); };
// Generate View API route
var generateViewApi = function (config) { return "\n  ".concat(generateBaseApi(config, 'view'), "\n\n  export async function GET(request: Request, { params }: { params: { id: string } }) {\n    try {\n      const data = await fs.readFile(getTablePath(), 'utf-8');\n      const records = JSON.parse(data);\n      const record = records.find((r: any) => r.id === parseInt(params.id));\n      if (!record) {\n        return NextResponse.json({ error: 'Record not found' }, { status: 404 });\n      }\n      return NextResponse.json(record);\n    } catch (error) {\n      return NextResponse.json({ error: 'Failed to fetch record' }, { status: 500 });\n    }\n  }\n"); };
// Generate Delete API route
var generateDeleteApi = function (config) { return "\n  ".concat(generateBaseApi(config, 'delete'), "\n\n  export async function DELETE(request: Request, { params }: { params: { id: string } }) {\n    try {\n      const data = await fs.readFile(getTablePath(), 'utf-8');\n      const records = JSON.parse(data);\n      const filteredRecords = records.filter((record: any) => record.id !== parseInt(params.id));\n      await fs.writeFile(getTablePath(), JSON.stringify(filteredRecords, null, 2));\n      return NextResponse.json({ success: true });\n    } catch (error) {\n      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });\n    }\n  }\n"); };
var generateApiRoutes = function (config) { return ({
    list: generateListApi(config),
    create: generateCreateApi(config),
    edit: generateEditApi(config),
    view: generateViewApi(config),
    delete: generateDeleteApi(config)
}); };
exports.generateApiRoutes = generateApiRoutes;
// Remove exports since we're defining everything in this file now
