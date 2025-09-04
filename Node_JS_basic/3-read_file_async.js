// countStudents.js (ou 3-read_file_async.js si c’est celui-là que tu corriges)
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    if (!path) {
      throw new Error('Cannot load the database');
    }

    const data = await fs.readFile(path, 'utf8');

    // Découpe + nettoyage (gère les lignes vides et \r)
    const lines = data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    // Aucune donnée utile (juste header ou vide)
    if (lines.length <= 1) {
      const zero = 'Number of students: 0';
      console.log(zero);
      return zero; // on retourne aussi la string pour réutiliser en HTTP
    }

    // Enlève l'entête
    const rows = lines.slice(1);

    // Groupement par field
    const studentsByField = {}; // { CS: ['Johann', ...], SWE: [...] }
    let totalStudents = 0;

    for (const line of rows) {
      const cols = line.split(',').map((c) => c.trim());
      if (cols.length < 4) continue; // ignore lignes incomplètes

      const firstName = cols[0];
      const field = cols[3];

      if (!firstName || !field) continue;

      if (!studentsByField[field]) studentsByField[field] = [];
      studentsByField[field].push(firstName);
      totalStudents += 1;
    }

    // Logs demandés (task 3) + construction de la string (task 7)
    const linesOut = [];
    const totalLine = `Number of students: ${totalStudents}`;
    console.log(totalLine);
    linesOut.push(totalLine);

    // Tri alphabétique des filières (souvent attendu)
    for (const field of Object.keys(studentsByField).sort()) {
      const names = studentsByField[field];
      const line = `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      console.log(line);
      linesOut.push(line);
    }

    return linesOut.join('\n');
  } catch (err) {
    // Uniformiser le message d’erreur comme demandé par l’énoncé
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
