// FILE: src/app/api/ping/route.ts
import { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

/**
 * Handles GET requests to /api/ping.
 * Responds with { pong: true, ts: Date.now() } in JSON.
 * Logs request and response timestamp.
 */
export async function GET(req: NextRequest) {
  const now = Date.now();
  logger.info({ event: 'ping_requested', ts: now });
  return new Response(
    JSON.stringify({ pong: true, ts: now }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
