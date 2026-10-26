import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Searching for package/ID structure in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('2000000000000') || line.includes('2000000000001') || line.includes('2000000000002') || line.includes('2000000000003')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
