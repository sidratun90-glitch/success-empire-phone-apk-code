import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const spreads = new Set();
for (let i = 21052; i < 29155; i++) {
  const line = lines[i];
  const match = /\.\.\.([A-Za-z0-9_]+)/.exec(line);
  if (match) {
    spreads.add(match[1]);
  }
}

console.log("Spreads found in lessonsList:");
console.log(Array.from(spreads));
