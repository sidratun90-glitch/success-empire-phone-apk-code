import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 24710-24770:");
for (let i = 24710; i < 24770; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
