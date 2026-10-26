import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

for (let i = 24020; i < 24090; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
