import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing current Premiere Pro Unlocked lessons in Block 1 (lines 25126 to 25249):");
for (let i = 25125; i < 25249; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
