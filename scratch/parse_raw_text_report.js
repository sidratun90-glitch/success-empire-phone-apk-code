import fs from 'fs';

const text = fs.readFileSync('c:/course app 3/scratch/last_console_response.json', 'utf8');
const lines = text.split('\n');

console.log(`Loaded ${lines.length} lines.`);
lines.forEach((l, idx) => {
  if (l.includes('[DB SYNC]') || l.includes('error') || l.includes('Error')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
