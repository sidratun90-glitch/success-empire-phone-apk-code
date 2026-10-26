import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log(`Total Lines: ${lines.length}`);
console.log(`Total Size: ${(content.length / 1024 / 1024).toFixed(2)} MB`);

const functions = [];
const constants = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const trimmed = line.trim();

  // Find functions or component declarations at root level (no leading spaces)
  if (!line.startsWith(' ') && !line.startsWith('\t')) {
    if (line.startsWith('function ') || line.startsWith('export default function ') || (line.startsWith('const ') && line.includes(' = ') && (line.includes('(') || line.includes('=>') || line.includes('function')))) {
      functions.push({ lineNum, text: trimmed });
    } else if (line.startsWith('const ') && (line.includes(' = [') || line.includes(' = {') || line.includes(' = `'))) {
      constants.push({ lineNum, text: trimmed });
    }
  }
});

console.log('\n--- Found Functions / Components (Global Scope) ---');
functions.forEach(f => console.log(`Line ${f.lineNum}: ${f.text}`));

console.log('\n--- Found Constants / Large Objects (Global Scope) ---');
constants.forEach(c => console.log(`Line ${c.lineNum}: ${c.text}`));
