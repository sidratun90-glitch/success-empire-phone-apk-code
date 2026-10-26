import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function printRange(start, end) {
  console.log(`\n=== Lines ${start} to ${end} ===`);
  for (let i = start; i <= end; i++) {
    console.log(`${i}: ${lines[i - 1]}`);
  }
}

printRange(28290, 28320);
printRange(33205, 33235);
