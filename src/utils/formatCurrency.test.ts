import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats 123.456 as $123.46', () => {
    expect(formatCurrency(123.456)).toBe('$123.46');
  });
  it('formats 0 as $0.00', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
  it('formats -42.8 as -$42.80', () => {
    expect(formatCurrency(-42.8)).toBe('-$42.80');
  });
  it('formats 5 as $5.00', () => {
    expect(formatCurrency(5)).toBe('$5.00');
  });
  it('formats 9999999.9 as $9999999.90', () => {
    expect(formatCurrency(9999999.9)).toBe('$9999999.90');
  });
  it('throws on NaN', () => {
    expect(() => formatCurrency(NaN)).toThrow('Input must be a finite number');
  });
  it('throws on Infinity', () => {
    expect(() => formatCurrency(Infinity)).toThrow('Input must be a finite number');
  });
  it('throws on -Infinity', () => {
    expect(() => formatCurrency(-Infinity)).toThrow('Input must be a finite number');
  });
});
