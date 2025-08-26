export default function updateUniqueItems(m) {
    if (!(m instanceof Map)) {
        throw new Error('Cannot process');
    }
    for (const [Key, value] of m) {
        if (value === 1) {
            m.set(Key, 100);
        }
    }
    return m;
}
