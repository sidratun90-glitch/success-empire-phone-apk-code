import fs from 'fs';
import path from 'path';

const query = process.argv[2];
if (!query) {
  console.error("Please provide a search query.");
  process.exit(1);
}

console.log(`Searching for: "${query}"`);
const filePath = 'src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let foundCount = 0;
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes(query.toLowerCase())) {
    foundCount++;
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
console.log(`Total occurrences: ${foundCount}`);
