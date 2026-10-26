import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

for (let j = 50; j < 80; j++) {
  console.log(`${j + 1}: ${lines[j]}`);
}
