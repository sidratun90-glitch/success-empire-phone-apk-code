import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing current Guide to Value Investing lessons in Block 1 (lines 24453 to 24626):");
for (let i = 24452; i < 24626; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
