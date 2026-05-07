/**
 * Clamps a number between min and max (inclusive).
 * @param value - The input number to clamp.
 * @param min - The minimum allowable value.
 * @param max - The maximum allowable value.
 * @returns The clamped number.
 */
export function clampNumber(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
