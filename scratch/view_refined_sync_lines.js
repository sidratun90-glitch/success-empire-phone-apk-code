import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(l => l.includes('// Auto-sync packages to Firestore if current user is admin'));
console.log(`Sync block starts at line ${startIdx + 1}`);

// Find the closing brace of the isAdmin block
let endIdx = startIdx;
let openBraces = 0;
let closedBraces = 0;
for (let i = startIdx; i < lines.length; i++) {
  const line = lines[i];
  openBraces += (line.match(/{/g) || []).length;
  closedBraces += (line.match(/}/g) || []).length;
  if (openBraces > 0 && openBraces === closedBraces) {
    endIdx = i;
    break;
  }
}
console.log(`Sync block ends at line ${endIdx + 1}`);

for (let i = startIdx; i <= endIdx; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
