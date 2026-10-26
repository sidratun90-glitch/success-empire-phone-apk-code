import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 25240 to 25255:");
for (let i = 25239; i < 25255; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
