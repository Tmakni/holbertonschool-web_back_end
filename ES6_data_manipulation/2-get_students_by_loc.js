export default function getStudentsByLocation() {
  if (!Array.isArray(list)) return [];
  return list.filter((student) => student.location === city);
}
