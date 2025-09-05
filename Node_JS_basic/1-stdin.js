const readline = require('readline');

console.log('Welcome to Holberton School, what is your name?');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isTTY = process.stdin.isTTY;

rl.on('line', (line) => {
  console.log(`Your name is: ${line}`);
  if (isTTY) {
    process.exit(0);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});

process.on('SIGINT', () => {
  console.log('This important software is now closing');
  process.exit(0);
});
