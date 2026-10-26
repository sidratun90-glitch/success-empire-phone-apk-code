const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('Free Included')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
