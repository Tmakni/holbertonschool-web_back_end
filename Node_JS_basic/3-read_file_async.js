const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        const lines = data
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l !== '');

        if (lines.length <= 1) {
          console.log('Number of students: 0');
          resolve();
          return;
        }

        const [, ...rows] = lines;

        const students = rows
          .map((line) => line.split(',').map((c) => c.trim()))
          .filter((cols) => cols.length >= 4);

        console.log(`Number of students: ${students.length}`);

        const groups = students.reduce((acc, cols) => {
          const firstName = cols[0];
          const field = cols[3];
          if (!acc[field]) acc[field] = [];
          acc[field].push(firstName);
          return acc;
        }, {});

        for (const field of Object.keys(groups).sort()) {
          console.log(
            `Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`
          );
        }

        resolve();
      } catch {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
