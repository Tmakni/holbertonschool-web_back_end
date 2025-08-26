export default function cleanSet(s, startString) {
  if (!(s instanceof Set)) return '';
  if (typeof startString !== 'string' || startString.length === 0) return '';

  const parts = [];
  for (const value of s) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      parts.push(value.slice(startString.length));
    }
  }
  return parts.join('-');
}
