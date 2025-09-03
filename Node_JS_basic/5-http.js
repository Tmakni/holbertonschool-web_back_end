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
        .map((l) => l.trim())
        .filter((l) => l !== '');

      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const rows = lines.slice(1);

      const groups = {};
      let total = 0;

      for (const line of rows) {
        const cols = line.split(',').map((c) => c.trim());
        if (cols.length < 4) continue;
        const firstName = cols[0];
        const field = cols[3];
        if (!field || !firstName) continue;

        if (!groups[field]) groups[field] = [];
        groups[field].push(firstName);
        total += 1;
      }

      const out = [];
      out.push(`Number of students: ${total}`);
      for (const field of Object.keys(groups).sort()) {
        out.push(
          `Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`
        );
      }
      resolve(out.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    buildStudentsReport(DB_PATH)
      .then((report) => {
        res.end(`This is the list of our students\n${report}`);
      })
      .catch(() => {
        res.end('This is the list of our students\nCannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);
module.exports = app;
