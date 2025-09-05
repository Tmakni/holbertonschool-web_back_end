const readline = require('readline');

console.log('Welcome to Holberton School, what is your name?');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  console.log(`Your name is: ${line}`);
  rl.close();
});

rl.on('close', () => {
  console.log('This important software is now closing');
});

rl.on('SIGINT', () => {
  console.log('This important software is now closing');
  process.exit(0);
});
