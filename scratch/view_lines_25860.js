import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 25860-25960:");
for (let i = 25860; i < 25960; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
