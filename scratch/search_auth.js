import fs from 'fs';

const code = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = code.split('\n');

lines.forEach((l, idx) => {
  if (l.toLowerCase().includes('signin') || l.toLowerCase().includes('login') || l.toLowerCase().includes('password')) {
    if (l.length < 150) {
      console.log(`Line ${idx + 1}: ${l.trim()}`);
    }
  }
});
