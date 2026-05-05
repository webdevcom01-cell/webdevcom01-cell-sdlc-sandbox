// FILE: tests/api/ping.test.ts
import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../../src/app';

describe('GET /api/ping', () => {
  it('should return a 200 status and correct response format', async () => {
    const response = await request(app).get('/api/ping');
    expect(response.status).toBe(200);
    expect(typeof response.body.ts).toBe('number');
    expect(response.body.pong).toBe(true);
    // Ensure ts is a recent timestamp
    const now = Date.now();
    expect(Math.abs(now - response.body.ts)).toBeLessThan(3000);
  });
});
