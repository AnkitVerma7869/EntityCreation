import { Entity } from '../../../interfaces/types';

export function generateListApi(config: Entity) {
  return `
    import { NextResponse } from 'next/server';
    import fs from 'fs/promises';
    import path from 'path';

    const getTablePath = () => path.join(process.cwd(), 'tables', '${config.entityName.toLowerCase()}.json');

    export async function GET() {
      // ... rest of the list API implementation
    }
  `;
} 