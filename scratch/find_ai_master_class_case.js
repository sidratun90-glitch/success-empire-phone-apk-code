import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching case-insensitively for 'ai master' or similar in App.jsx:");
lines.forEach((line, idx) => {
  const lower = line.toLowerCase();
  if (lower.includes('ai master') || lower.includes('ai_master')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
