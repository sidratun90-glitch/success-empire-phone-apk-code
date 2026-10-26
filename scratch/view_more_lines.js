import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 23900-24020:");
for (let i = 23900; i < 24020; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
