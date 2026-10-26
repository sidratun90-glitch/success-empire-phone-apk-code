import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 31430-31575:");
for (let i = 31430; i < 31575; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
