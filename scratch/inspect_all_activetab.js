import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'activeTab' inside PackageDetailScreen in App.jsx:");
lines.forEach((line, idx) => {
  if (idx >= 5770 && idx < 6700) {
    if (line.includes('activeTab')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
