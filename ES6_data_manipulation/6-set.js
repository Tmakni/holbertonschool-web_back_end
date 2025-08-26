export default function setFromArray(arr) {
    if (!Array.isArray(arr)) return new Set();

    const result = new Set(arr);
    return result;
}
