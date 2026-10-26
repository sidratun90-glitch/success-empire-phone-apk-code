import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for the end of the second lessons array (around line 25953):");
let braceCount = 0;
let started = false;
for (let i = 25953; i < lines.length; i++) {
  if (lines[i].includes('pkgData.lessons = [')) {
    started = true;
  }
  // Let's search for when the array ends: "];" followed by standard code or "pkgData.thumbnail = premiumPlusPkgImg;"
  if (lines[i].includes('];') && lines[i+1] && (lines[i+1].includes('pkgData.thumbnail') || lines[i+1].includes('if (!pkgData.thumbnail'))) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
    console.log(`Line ${i + 2}: ${lines[i+1].trim()}`);
    break;
  }
}
