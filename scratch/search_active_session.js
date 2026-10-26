const fs = require('fs');
const content = fs.readFileSync('c:/Users/HP/OneDrive/Desktop/course app 2/src/App.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('activeVideoSession') || line.includes('setActiveVideoSession')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
