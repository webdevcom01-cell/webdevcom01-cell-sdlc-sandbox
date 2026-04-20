export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    throw new TypeError('Input must be a finite number');
  }
  const sign = value < 0 ? '-' : '';
  const absValue = Math.abs(value);
  return `${sign}$${absValue.toFixed(2)}`;
}
