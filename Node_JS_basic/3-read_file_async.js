const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l !== '');

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const rows = lines.slice(1);

      const groups = new Map();
      let total = 0;

      for (const line of rows) {
        const cols = line.split(',').map((c) => c.trim());
        if (cols.length < 4) continue;
        const firstName = cols[0];
        const field = cols[3];

        if (!groups.has(field)) groups.set(field, []);
        groups.get(field).push(firstName);
        total += 1;
      }

      console.log(`Number of students: ${total}`);

      for (const [field, list] of groups) {
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
