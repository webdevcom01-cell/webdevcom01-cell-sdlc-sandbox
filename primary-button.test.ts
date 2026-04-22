import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const src = readFileSync(join(process.cwd(), 'primary-button.tsx'), 'utf8');

describe('primary-button exports', () => {
  it('has a default export', () => {
    expect(src.includes('export default')).toBe(true);
  });
  it('has a named export', () => {
    expect(src.includes('export function') || src.includes('export const') || src.includes('export class')).toBe(true);
  });
  it('uses React', () => {
    expect(src.includes('react')).toBe(true);
  });
  it('has TypeScript interface', () => {
    expect(src.includes('Props')).toBe(true);
  });
  it('has ARIA attributes', () => {
    expect(src.includes('aria-') || src.includes('role=')).toBe(true);
  });
});