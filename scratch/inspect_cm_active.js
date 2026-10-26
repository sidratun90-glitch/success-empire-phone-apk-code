import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Active lessons start around line 24054 and end around 24183
console.log("Printing the ACTIVE Content Marketing lessons block (lines 24054 to 24183):");
for (let i = 24053; i < 24183; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
