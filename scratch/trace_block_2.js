import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 32670 to 32820 in App.jsx:");
for (let i = 32669; i < 32820; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
