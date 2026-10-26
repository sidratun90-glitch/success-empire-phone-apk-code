import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing current Mastering Facebook Ads lessons in Block 2 (lines 21378 to 21511):");
for (let i = 21377; i < 21511; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
