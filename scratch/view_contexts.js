import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

function viewAround(lineNo, countBefore = 10, countAfter = 10) {
  console.log(`\n=================== Lines around ${lineNo} ===================`);
  const start = Math.max(0, lineNo - 1 - countBefore);
  const end = Math.min(lines.length - 1, lineNo - 1 + countAfter);
  for (let i = start; i <= end; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}

viewAround(20988, 5, 5);
viewAround(29556, 15, 10);
viewAround(35635, 15, 10);
