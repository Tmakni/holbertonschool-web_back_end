export default function appendToEachArrayValue(array, appendString) {
  for (let i = 0; i < array.length; i+= 1) {
    array[i] = appendString + array[i];
  }

  return array;
}
