import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const startLine = 36982;
console.log("Scanning upwards from line " + startLine + "...");
for (let i = startLine - 1; i >= Math.max(0, startLine - 300); i--) {
  const line = lines[i];
  if (line.includes('useEffect') || line.includes('function ') || line.includes('const ') || line.includes('let ') || line.includes('2000000000003')) {
    console.log(`  Line ${i + 1}: ${line.trim()}`);
  }
}
