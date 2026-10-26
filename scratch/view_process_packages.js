import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(l => l.includes('const processPackagesSnapshot ='));
console.log(`processPackagesSnapshot starts at line ${startIdx + 1}`);

for (let i = startIdx; i < startIdx + 120; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
