import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'lessons:' occurrences:");
lines.forEach((line, idx) => {
  if (line.includes('lessons:') && line.trim().startsWith('lessons:')) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 80)}`);
  }
  if (line.includes('const initialPackages') || line.includes('let initialPackages') || line.includes('const defaultPackages')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
