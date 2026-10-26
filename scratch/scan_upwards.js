import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const startLine = 24029;
console.log("Scanning upwards from line " + startLine + "...");
let bracesCount = 0;
let bracketsCount = 0;

for (let i = startLine - 1; i >= Math.max(0, startLine - 1000); i--) {
  const line = lines[i];
  if (line.includes('const ') || line.includes('let ') || line.includes('var ') || line.includes('lessons:') || line.includes('courses:') || line.includes('id: 2000000') || line.includes('title: "Standard Package"')) {
    console.log(`Found declaration at line ${i + 1}: ${line.trim()}`);
    // print surrounding lines
    for (let j = -5; j <= 5; j++) {
      console.log(`  [${i + 1 + j}]: ${lines[i + j]}`);
    }
    break;
  }
}
