const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const students = lines.slice(1)
      .map((line) => line.split(','))
      .filter((student) => student.length >= 4);

    console.log(`Number of students: ${students.length}`);

    const groups = {};
    for (const cols of students) {
      const firstName = cols[0].trim();
      const field = cols[3].trim();
      if (!groups[field]) groups[field] = [];
      groups[field].push(firstName);
    }

    for (const field of Object.keys(groups).sort()) {
      const list = groups[field].join(', ');
      console.log(`Number of students in ${field}: ${groups[field].length}. List: ${list}`);
    }
  } catch (e) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
