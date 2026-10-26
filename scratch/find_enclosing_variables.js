import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const targets = [24084, 32682, 38578];

targets.forEach(lineNo => {
  console.log(`\n--- Looking for enclosing structure above line ${lineNo} ---`);
  
  // Let's print the first line starting with const/let/var/function/class that is at indent level 0 or 1 or 2 (less than 10 spaces)
  let found = false;
  for (let idx = lineNo - 1; idx >= 0; idx--) {
    const line = lines[idx];
    const match = line.match(/^(\s*)(let|const|var|function)\s+(\w+)/);
    if (match) {
      const indent = match[1].length;
      if (indent <= 12) {
        console.log(`Line ${idx + 1} (Indent ${indent}): ${line.trim()}`);
        found = true;
        // Let's print 5 lines around it
        for (let j = Math.max(0, idx - 2); j <= Math.min(lines.length - 1, idx + 2); j++) {
          console.log(`  ${j+1}: ${lines[j]}`);
        }
        break;
      }
    }
  }
  if (!found) {
    console.log("No enclosing declaration found with low indent.");
  }
});
