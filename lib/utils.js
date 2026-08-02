export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatPrice(price) {
  return `${Number(price).toLocaleString("en-US")} DA`;
}

export function orderCode(orderId) {
  return `NJ-${orderId.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
