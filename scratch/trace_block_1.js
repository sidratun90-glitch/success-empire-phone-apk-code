import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 24050 to 24200 in App.jsx:");
for (let i = 24049; i < 24200; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
