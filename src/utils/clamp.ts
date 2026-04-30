/**
 * Clamps a number between the provided min and max bounds.
 * If value < min, returns min. If value > max, returns max. Otherwise, returns value.
 * @param value - The number to clamp
 * @param min - The lower bound
 * @param max - The upper bound
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
