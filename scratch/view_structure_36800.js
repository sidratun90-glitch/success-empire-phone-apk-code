import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 36800-36960:");
for (let i = 36800; i < 36960; i++) {
  // Let's print only lines that look like function declarations or start of objects/arrays
  const line = lines[i];
  if (line.includes('function') || line.includes('const') || line.includes('let') || line.includes('lessons = [') || line.includes('pkgId ===') || line.includes('=== 2000000000003')) {
    console.log(`${i + 1}: ${line.trim()}`);
  }
}
