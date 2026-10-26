import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function findParent(targetLine) {
  console.log(`\n=== Scanning upwards from line ${targetLine} ===`);
  let indent = -1;
  for (let i = targetLine; i >= 1; i--) {
    const line = lines[i - 1];
    const trimmed = line.trim();
    if (trimmed.startsWith('const ') || trimmed.startsWith('let ') || trimmed.startsWith('var ')) {
      console.log(`Line ${i}: ${line}`);
      break;
    }
    // Also print lines that look like package/course objects
    if (trimmed.startsWith('title:') || trimmed.startsWith('name:') || trimmed.startsWith('id:')) {
      // only if indentation is less than the lesson level
      const currentIndent = line.length - trimmed.length;
      if (indent === -1 || currentIndent < indent) {
        indent = currentIndent;
        console.log(`Line ${i} (indent ${currentIndent}): ${line}`);
      }
    }
  }
}

findParent(29473);
findParent(34230);
