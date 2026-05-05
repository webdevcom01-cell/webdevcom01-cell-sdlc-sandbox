// FILE: src/app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/hello
 * Returns a hello world message with the current timestamp
 */
export async function GET(_req: NextRequest) {
  return NextResponse.json({
    message: 'Hello World',
    timestamp: Date.now(),
  });
}
