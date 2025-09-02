console.log("Welcome to Holberton School, what is your name?")
process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk) => {
  const name = chunk.split('\n')[0].trim();
  if (name.length > 0) {
    console.log(`Your name is: ${name}`);
  }
});

process.on('SIGINT', () => {
  console.log('This important software is now closing');
  process.exit(0);
});
