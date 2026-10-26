import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'premium_plus_lesson' occurrences:");
let count = 0;
lines.forEach((line, idx) => {
  if (line.includes('premium_plus_lesson') && line.includes('id:')) {
    count++;
    if (count <= 30) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
console.log(`Total found: ${count}`);
