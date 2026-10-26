import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 21510 to 21525:");
for (let i = 21509; i < 21525; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
