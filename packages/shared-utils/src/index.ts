export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export const mean = (arr: number[]): number =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

export const stdDev = (arr: number[]): number => {
  if (!arr.length) return 0;
  const m = mean(arr);
  return Math.sqrt(mean(arr.map((v) => (v - m) ** 2)));
};
