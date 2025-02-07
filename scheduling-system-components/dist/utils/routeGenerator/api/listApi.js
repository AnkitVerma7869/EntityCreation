"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListApi = generateListApi;
function generateListApi(config) {
    return "\n    import { NextResponse } from 'next/server';\n    import fs from 'fs/promises';\n    import path from 'path';\n\n    const getTablePath = () => path.join(process.cwd(), 'tables', '".concat(config.entityName.toLowerCase(), ".json');\n\n    export async function GET() {\n      // ... rest of the list API implementation\n    }\n  ");
}
