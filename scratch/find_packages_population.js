import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'PACKAGES' population in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('PACKAGES =') || line.includes('PACKAGES.push') || line.includes('setPackages')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
