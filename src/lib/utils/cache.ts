export class SimpleCache<K, V> {
  private store: Map<K, { value: V; expiresAt?: number }>

  constructor() {
    this.store = new Map();
  }

  set(key: K, value: V, ttlMs?: number): void {
    let expiresAt: number | undefined = undefined;
    if (typeof ttlMs === 'number' && ttlMs > 0) {
      expiresAt = Date.now() + ttlMs;
    }
    this.store.set(key, { value, expiresAt });
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt !== undefined && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  has(key: K): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;
    if (entry.expiresAt !== undefined && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return false;
    }
    return true;
  }
}
