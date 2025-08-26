export default function updateStudentGradeByCity(list, city, newGrades) {
  if (!Array.isArray(list)) return [];
  const grades = Array.isArray(newGrades) ? newGrades : [];

  return list
    .filter((s) => s.location === city)
    .map((s) => {
      const g = grades.find((x) => x.studentId === s.id);
      return { ...s, grade: g ? g.grade : 'N/A' };
    });
}
