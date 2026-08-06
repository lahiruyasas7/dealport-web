export function formatPrice(price: string) {
  return `$${Number(price).toFixed(2)}`;
}