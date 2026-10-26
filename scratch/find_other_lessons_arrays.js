import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const arrayRegex = /const\s+([a-zA-Z0-9_]+Lessons)\s*=/g;
let match;
console.log("Checking for lessons array declarations in App.jsx:");
while ((match = arrayRegex.exec(content)) !== null) {
  console.log(`  Found declaration: ${match[0]} at line ${content.substring(0, match.index).split('\n').length}`);
}
