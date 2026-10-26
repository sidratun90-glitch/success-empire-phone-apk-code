import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 20900 to 20990 in App.jsx:");
for (let i = 20899; i < 20990; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
