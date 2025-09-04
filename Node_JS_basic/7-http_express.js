const express = require('express');
const countStudents = require('./3-read_file_async.js')

const app = express();
const databaseFile = process.argv[2]

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', async(req, res) => {
    res.type('text/plain');
    let reponse = 'This is the list of our students';
    try {
      const result = await contStudents(databaseFile);
      reponse += result;
      res.send(reponse);
    } catch (err) {
        reponse += err.message;
        res.send(reponse);
    }
})

app.listen(1245, () => {
  // ecoute
});
module.exports = app;
