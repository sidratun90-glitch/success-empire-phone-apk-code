const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('const ExploreScreen')) {
    console.log(`ExploreScreen defined at line: ${index + 1}`);
  }
});
