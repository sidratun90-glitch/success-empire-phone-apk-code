import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 18800-18870:");
for (let i = 18800; i < 18870; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
