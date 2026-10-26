import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 38570 to 38725 in App.jsx:");
for (let i = 38569; i < 38725; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
