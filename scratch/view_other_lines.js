import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Printing lines 31100-31130:");
for (let i = 31100; i < 31130; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log("\nPrinting lines 36960-36990:");
for (let i = 36960; i < 36990; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
