import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const checkLines = [28495, 34377];

checkLines.forEach(lineNum => {
  console.log(`\n--- Context for line ${lineNum} ---`);
  // scan upwards for package id or condition
  for (let j = lineNum - 1; j >= 0; j--) {
    const trimmed = lines[j].trim();
    if (trimmed.includes('pkgId ===') || trimmed.includes('pkgId ===') || trimmed.includes('if (pkgId ===') || trimmed.includes('pkgId === 20000')) {
      console.log(`Parent condition at line ${j + 1}: ${trimmed}`);
      break;
    }
    if (trimmed.startsWith('const ') && trimmed.includes(' = ') && (trimmed.includes('[') || trimmed.includes('{'))) {
      console.log(`Parent const at line ${j + 1}: ${trimmed}`);
      break;
    }
  }

  // print lines
  for (let i = lineNum - 5; i < lineNum + 15; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
});
