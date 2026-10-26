import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for package ID checks in the entire file:");
lines.forEach((line, idx) => {
  if (line.includes('2000000000003') && (line.includes('===') || line.includes('=='))) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
