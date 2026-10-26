const fs = require('fs');
const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n');

for (let i = 4834; i < 5800; i++) {
  const line = lines[i];
  if (line.includes('useEffect')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
    // Print the next 10 lines of the hook to see dependencies and content
    for (let j = 1; j <= 12; j++) {
      if (lines[i + j]) {
        console.log(`  + ${lines[i + j].trim()}`);
      }
    }
  }
}
