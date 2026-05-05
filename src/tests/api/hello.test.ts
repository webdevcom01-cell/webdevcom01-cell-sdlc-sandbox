// FILE: src/tests/api/hello.test.ts
import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/hello/route';
import { NextRequest } from 'next/server';

function createMockNextRequest(method: string = 'GET', url: string = 'http://localhost/api/hello') {
  // Partial implementation sufficient for GET handler
  return new NextRequest(url, { method });
}

describe('GET /api/hello', () => {
  it('should return Hello World message and timestamp', async () => {
    const req = createMockNextRequest();
    const res = await GET(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual(
      expect.objectContaining({
        message: 'Hello World',
        timestamp: expect.any(Number),
      })
    );
    // Additional check: timestamp is within the last 5 seconds (to guard against stale/fake responses)
    expect(Math.abs(json.timestamp - Date.now())).toBeLessThan(5000);
  });
});
