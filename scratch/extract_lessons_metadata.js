import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const activeLessons = [];
let startLine = 24054; // lesson 0
let endLine = 24183;   // lesson 12

let currentObjStr = '';
for (let i = startLine - 1; i < endLine; i++) {
  currentObjStr += lines[i] + '\n';
}

console.log("Current content marketing lessons block text extracted.");
fs.writeFileSync('c:/course app 3/scratch/extracted_raw.txt', currentObjStr, 'utf8');
console.log("Saved raw block to scratch/extracted_raw.txt");
