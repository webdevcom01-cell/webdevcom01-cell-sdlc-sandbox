import { describe, it, expect } from 'vitest';
import { clampNumber } from './clampNumber';

describe('clampNumber', () => {
  it('returns value if within min and max', () => {
    expect(clampNumber(5, 1, 10)).toBe(5);
  });

  it('returns min if value is less than min', () => {
    expect(clampNumber(-5, 0, 10)).toBe(0);
  });

  it('returns max if value is greater than max', () => {
    expect(clampNumber(20, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clampNumber(3, 3, 8)).toBe(3);
  });

  it('returns max when value equals max', () => {
    expect(clampNumber(8, 3, 8)).toBe(8);
  });

  it('handles zero boundaries correctly', () => {
    expect(clampNumber(0, 0, 0)).toBe(0);
    expect(clampNumber(1, 0, 0)).toBe(0);
    expect(clampNumber(-1, 0, 0)).toBe(0);
  });

  it('throws if min > max', () => {
    expect(() => clampNumber(5, 10, 1)).toThrow('min must be less than or equal to max');
  });
});
