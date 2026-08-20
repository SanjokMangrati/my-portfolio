export function formatCount(value: number, digits: number): string {
  return String(Math.max(0, value))
    .padStart(digits, '0')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
