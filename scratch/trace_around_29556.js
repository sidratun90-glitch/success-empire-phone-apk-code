import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 29540 to 29590 in App.jsx:");
for (let i = 29539; i < 29590; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
