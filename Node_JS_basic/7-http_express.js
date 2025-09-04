// 7-http_express.js
const express = require('express');
const fs = require('fs');

const app = express();
const databaseFile = process.argv[2];

function buildStudentsReport(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');

      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const rows = lines.slice(1);
      const groups = {}; // { CS: ['...'], SWE: ['...'] }
      let total = 0;

      rows.forEach((row) => {
        const cols = row.split(',').map((c) => c.trim());
        if (cols.length >= 4) {
          const firstName = cols[0];
          const field = cols[3];

          if (firstName && field) {
            if (!groups[field]) {
              groups[field] = [];
            }
            groups[field].push(firstName);
            total += 1;
          }
        }
      });

      const out = [`Number of students: ${total}`];

      Object.keys(groups)
        .sort()
        .forEach((dept) => {
          const names = groups[dept];
          const list = names.join(', ');
          const line = `Number of students in ${dept}: ${names.length}. List: ${list}`;
          out.push(line);
        });

      resolve(out.join('\n'));
    });
  });
}

app.get('/', (_req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (_req, res) => {
  res.type('text/plain');
  const header = 'This is the list of our students';

  buildStudentsReport(databaseFile)
    .then((report) => {
      res.send(`${header}\n${report}`);
    })
    .catch(() => {
      res.send(`${header}\nCannot load the database`);
    });
});

app.listen(1245);

module.exports = app;
