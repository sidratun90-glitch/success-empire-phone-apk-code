import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('onSnapshot') && line.includes('"packages"')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
