// countStudents.js
const fs = require('fs').promises;

function countStudents(path) {
  if (!path) {
    return Promise.reject(new Error('Cannot load the database'));
  }

  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');

      if (lines.length <= 1) {
        const zero = 'Number of students: 0';
        console.log(zero);
        return zero;
      }

      const rows = lines.slice(1);

      const studentsByField = {};
      let totalStudents = 0;

      rows.forEach((row) => {
        const cols = row.split(',').map((c) => c.trim());
        if (cols.length >= 4) {
          const firstName = cols[0];
          const field = cols[3];

          if (firstName && field) {
            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }
            studentsByField[field].push(firstName);
            totalStudents += 1;
          }
        }
      });

      const linesOut = [];
      const totalLine = `Number of students: ${totalStudents}`;
      console.log(totalLine);
      linesOut.push(totalLine);

      Object.keys(studentsByField).sort().forEach((field) => {
        const names = studentsByField[field];
        const line = `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        console.log(line);
        linesOut.push(line);
      });

      return linesOut.join('\n');
    })
    .catch(() => {
      // Rejeter avec le message imposé par l'énoncé
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
