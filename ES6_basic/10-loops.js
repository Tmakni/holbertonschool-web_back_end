export default function appendToEachArrayValue(array, appendString) {
  for (cosnt idx in array) {
    const value = array[idx];
    array[idx] = appendString + value;
  }

  return appendString;
}
