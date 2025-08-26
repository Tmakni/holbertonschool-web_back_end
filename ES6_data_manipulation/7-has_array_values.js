export default function hasValuesFromArray(s, arr) {
  if (!(s instanceof Set) || !Array.isArray(arr)) return false;

  for (const value of arr) {
    if (!s.has(value)) return false;
  }

  return true;
}
