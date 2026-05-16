import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify', () => {
  it('converts basic string with spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips accented characters', () => {
    expect(slugify('Café über')).toBe('cafe-uber');
  });

  it('handles multiple spaces', () => {
    expect(slugify('multiple   spaces here')).toBe('multiple-spaces-here');
  });

  it('replaces special characters with hyphens', () => {
    expect(slugify('hello@world! How_are you?')).toBe('hello-world-how-are-you');
  });

  it('returns already-clean slug unchanged (except lowercased)', () => {
    expect(slugify('already-clean-slug')).toBe('already-clean-slug');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });

  it('returns empty string for all special chars', () => {
    expect(slugify('!@#$%^&*()_+=[]{}|;:",.<>?/\\')).toBe('');
  });

  it('handles numbers mixed with text', () => {
    expect(slugify('Product 123 name!')).toBe('product-123-name');
  });
});
