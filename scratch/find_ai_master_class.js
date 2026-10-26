import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'AI master class 1.0' in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('AI master class 1.0') || line.includes('ai_master_class')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
