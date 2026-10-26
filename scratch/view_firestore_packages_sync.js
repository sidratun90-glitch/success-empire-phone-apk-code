import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 29720 to 29760 in App.jsx:");
for (let i = 29719; i < 29760; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
