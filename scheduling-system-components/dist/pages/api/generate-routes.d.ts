import { NextResponse } from 'next/server';
export declare function POST(request: Request): Promise<NextResponse<{
    success: boolean;
}>>;
