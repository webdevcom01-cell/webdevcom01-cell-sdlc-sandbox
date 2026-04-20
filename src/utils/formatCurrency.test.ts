import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats 1234.5 as $1234.50', () => {
    expect(formatCurrency(1234.5)).toBe('$1234.50');
  });

  it('formats 0 as $0.00', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative number -42.8 as -$42.80', () => {
    expect(formatCurrency(-42.8)).toBe('-$42.80');
  });

  it('formats small decimal 3.1 as $3.10', () => {
    expect(formatCurrency(3.1)).toBe('$3.10');
  });

  it('throws on NaN input', () => {
    expect(() => formatCurrency(NaN)).toThrow('Input must be a finite number');
  });

  it('throws on Infinity input', () => {
    expect(() => formatCurrency(Infinity)).toThrow('Input must be a finite number');
  });

  it('formats large integer 999999 as $999999.00', () => {
    expect(formatCurrency(999999)).toBe('$999999.00');
  });

  it('formats -0 as $0.00', () => {
    expect(formatCurrency(-0)).toBe('$0.00');
  });
});
