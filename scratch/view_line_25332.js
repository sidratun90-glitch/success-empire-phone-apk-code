import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 25310 to 25350 in App.jsx:");
for (let i = 25309; i < 25350; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
