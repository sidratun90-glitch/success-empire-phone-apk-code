import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 28585 to 28620 in App.jsx:");
for (let i = 28584; i < 28620; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
