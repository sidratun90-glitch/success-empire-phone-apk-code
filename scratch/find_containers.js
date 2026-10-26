import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function findDeclaringFunction(lineNum) {
  console.log(`\n--- Finding container function/block for Line ${lineNum} ---`);
  // Look up to 100 lines above lineNum for a function or hook declaration
  for (let i = lineNum - 1; i >= Math.max(0, lineNum - 120); i--) {
    const line = lines[i];
    if (line.includes('useEffect') || line.includes('function ') || line.includes('const ') || line.includes('let ')) {
      console.log(`  Line ${i + 1}: ${line.trim()}`);
    }
  }
}

findDeclaringFunction(18856);
findDeclaringFunction(25942);
findDeclaringFunction(31555);
