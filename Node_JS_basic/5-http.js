// 5-http.js (ou le nom attendu par ta task)
const http = require('http');
const fs = require('fs');

const DB_PATH = process.argv[2];

function buildStudentsReport(filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
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

      const out = [];
      out.push(`Number of students: ${total}`);

      // éviter le no-shadow avec 'field' déjà utilisé plus haut
      Object.keys(groups).sort().forEach((dept) => {
        const names = groups[dept];
        const listStr = names.join(', ');
        out.push(`Number of students in ${dept}: ${names.length}. List: ${listStr}`);
      });

      resolve(out.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    buildStudentsReport(DB_PATH)
      .then((report) => {
        res.end(`This is the list of our students\n${report}`);
      })
      .catch(() => {
        res.end('This is the list of our students\nCannot load the database');
      });
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

app.listen(1245);

module.exports = app;
