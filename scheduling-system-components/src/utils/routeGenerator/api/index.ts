/**
 * API Route Generator Module
 * Generates Next.js API routes for CRUD operations on entities
 */

import { Entity } from '../../../interfaces/types';

// Import core Next.js server components that will be needed in the API routes
import { NextResponse } from 'next/server';

/**
 * Generates base API route template with common imports and utilities
 * @param {Entity} config - Entity configuration
 * @param {string} operation - Type of API operation (list, create, edit, etc.)
 * @returns {string} Base API route template
 */
const generateBaseApi = (config: Entity, operation: string) => `
  import { NextResponse } from 'next/server';
  import fs from 'fs/promises';
  import path from 'path';

  const getTablePath = () => path.join(process.cwd(), 'tables', '${config.entityName.toLowerCase()}.json');
`;

/**
 * Generates List API route for fetching all records
 * @param {Entity} config - Entity configuration
 * @returns {string} List API route implementation
 */
const generateListApi = (config: Entity) => `
  ${generateBaseApi(config, 'list')}

  export async function GET() {
    try {
      const data = await fs.readFile(getTablePath(), 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  }
`;

/**
 * Generates Create API route for adding new records
 * @param {Entity} config - Entity configuration
 * @returns {string} Create API route implementation
 */
const generateCreateApi = (config: Entity) => `
  ${generateBaseApi(config, 'create')}

  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const data = await fs.readFile(getTablePath(), 'utf-8');
      const records = JSON.parse(data);
      records.push({ id: Date.now(), ...body });
      await fs.writeFile(getTablePath(), JSON.stringify(records, null, 2));
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
    }
  }
`;

// Generate Edit API route
const generateEditApi = (config: Entity) => `
  ${generateBaseApi(config, 'edit')}

  export async function PUT(request: Request) {
    try {
      const body = await request.json();
      const data = await fs.readFile(getTablePath(), 'utf-8');
      const records = JSON.parse(data);
      const index = records.findIndex((record: any) => record.id === body.id);
      if (index === -1) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      records[index] = { ...records[index], ...body };
      await fs.writeFile(getTablePath(), JSON.stringify(records, null, 2));
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
    }
  }
`;

// Generate View API route
const generateViewApi = (config: Entity) => `
  ${generateBaseApi(config, 'view')}

  export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const data = await fs.readFile(getTablePath(), 'utf-8');
      const records = JSON.parse(data);
      const record = records.find((r: any) => r.id === parseInt(params.id));
      if (!record) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      return NextResponse.json(record);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch record' }, { status: 500 });
    }
  }
`;

// Generate Delete API route
const generateDeleteApi = (config: Entity) => `
  ${generateBaseApi(config, 'delete')}

  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      const data = await fs.readFile(getTablePath(), 'utf-8');
      const records = JSON.parse(data);
      const filteredRecords = records.filter((record: any) => record.id !== parseInt(params.id));
      await fs.writeFile(getTablePath(), JSON.stringify(filteredRecords, null, 2));
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }
  }
`;

/**
 * Exports all API route generators as a single object
 * @param {Entity} config - Entity configuration
 * @returns {Object} Object containing all API route implementations
 */
export const generateApiRoutes = (config: Entity) => ({
  list: generateListApi(config),
  create: generateCreateApi(config),
  edit: generateEditApi(config),
  view: generateViewApi(config),
  delete: generateDeleteApi(config)
});

// Remove exports since we're defining everything in this file now