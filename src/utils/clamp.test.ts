import { describe, it, expect } from 'vitest';
import { clamp } from './clamp';

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it('returns min when value is below min', () => {
    expect(clamp(-2, 0, 8)).toBe(0);
  });

  it('returns max when value is above max', () => {
    expect(clamp(100, 0, 50)).toBe(50);
  });

  it('returns min when value equals min', () => {
    expect(clamp(3, 3, 6)).toBe(3);
  });

  it('returns max when value equals max', () => {
    expect(clamp(6, 3, 6)).toBe(6);
  });

  it('works for negative bounds', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('returns value when min equals max and value equals both', () => {
    expect(clamp(7, 7, 7)).toBe(7);
  });

  it('throws error if min > max', () => {
    expect(() => clamp(5, 10, 2)).toThrow('min must be less than or equal to max');
  });
});
