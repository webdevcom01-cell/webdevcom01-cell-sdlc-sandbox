import { describe, it, expect } from 'vitest'
import { SimpleCache } from './cache'

describe('SimpleCache', () => {
  it('basic set/get returns value', () => {
    const cache = new SimpleCache<string, number>()
    cache.set('foo', 123)
    expect(cache.get('foo')).toBe(123)
  })

  it('expired entry returns undefined', async () => {
    const cache = new SimpleCache<string, string>()
    cache.set('bar', 'baz', 10)
    await new Promise(r => setTimeout(r, 20))
    expect(cache.get('bar')).toBeUndefined()
  })

  it('has() returns true before expiry, false after', async () => {
    const cache = new SimpleCache<number, number>()
    cache.set(1, 999, 30)
    expect(cache.has(1)).toBe(true)
    await new Promise(r => setTimeout(r, 35))
    expect(cache.has(1)).toBe(false)
  })

  it('overwriting existing key updates value and TTL', async () => {
    const cache = new SimpleCache<string, string>()
    cache.set('dup', 'first', 50)
    cache.set('dup', 'second', 10)
    expect(cache.get('dup')).toBe('second')
    await new Promise(r => setTimeout(r, 15))
    expect(cache.get('dup')).toBeUndefined()
  })

  it('cache entry without TTL never expires', async () => {
    const cache = new SimpleCache<string, string>()
    cache.set('persist', 'value')
    await new Promise(r => setTimeout(r, 30))
    expect(cache.get('persist')).toBe('value')
    expect(cache.has('persist')).toBe(true)
  })

  it('returns undefined for missing key', () => {
    const cache = new SimpleCache<string, string>()
    expect(cache.get('missing')).toBeUndefined()
    expect(cache.has('missing')).toBe(false)
  })

  it('accepts empty string and zero as keys', () => {
    const cache = new SimpleCache<string | number, string>()
    cache.set('', 'empty')
    cache.set(0, 'zero')
    expect(cache.get('')).toBe('empty')
    expect(cache.get(0)).toBe('zero')
    expect(cache.has('')).toBe(true)
    expect(cache.has(0)).toBe(true)
  })

  it('negative TTL disables expiration (acts as no TTL)', async () => {
    const cache = new SimpleCache<string, string>()
    cache.set('neg', 'negval', -100)
    await new Promise(r => setTimeout(r, 10))
    expect(cache.get('neg')).toBe('negval')
    expect(cache.has('neg')).toBe(true)
  })
})
