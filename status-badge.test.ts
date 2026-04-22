import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const src = readFileSync(join(process.cwd(), 'status-badge.tsx'), 'utf8');

describe('status-badge component structure', () => {
  it('has a default export', () => {
    expect(src).toMatch(/export\s+default/);
  });

  it('has a named export function or const', () => {
    expect(src).toMatch(/export\s+(function|const|class)\s+\w/);
  });

  it('uses React', () => {
    expect(src).toMatch(/(from\s+['"]react['"])|(React\.createElement)|(<[A-Z])/);
  });

  it('defines a TypeScript props interface', () => {
    expect(src).toMatch(/interface\s+\w+Props/);
  });

  it('includes ARIA accessibility attributes', () => {
    expect(src).toMatch(/aria-|role=/);
  });
});
