import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for DashboardScreen rendering in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('<DashboardScreen') || line.includes('DashboardScreen')) {
    if (idx > 40000) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
