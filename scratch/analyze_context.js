import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function printContext(lineNum) {
  console.log(`--- Context for Line ${lineNum} ---`);
  // scan upwards for function, const, let, or class declarations
  let foundDecl = [];
  for (let i = lineNum - 1; i >= Math.max(0, lineNum - 200); i--) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('const ') || trimmed.startsWith('let ') || trimmed.startsWith('var ') || trimmed.startsWith('function ') || trimmed.includes('={') || trimmed.includes(': [')) {
      foundDecl.push(`${i + 1}: ${trimmed}`);
      if (foundDecl.length >= 10) break;
    }
  }
  foundDecl.reverse().forEach(d => console.log(d));
}

printContext(24032);
printContext(31118);
printContext(36982);
