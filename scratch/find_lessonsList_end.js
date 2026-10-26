import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startIdx = -1;
lines.forEach((line, idx) => {
  if (line.includes('let lessonsList = [')) {
    startIdx = idx;
  }
});

if (startIdx !== -1) {
  console.log(`Found 'let lessonsList = [' at line ${startIdx + 1}`);
  // Trace forward to find the matching '];'
  let endIdx = -1;
  for (let j = startIdx; j < lines.length; j++) {
    if (lines[j].trim() === '];') {
      endIdx = j;
      break;
    }
  }
  if (endIdx !== -1) {
    console.log(`Found end '];' at line ${endIdx + 1}`);
    console.log("Printing 30 lines after end of lessonsList:");
    for (let k = endIdx; k < endIdx + 30; k++) {
      console.log(`${k + 1}: ${lines[k]}`);
    }
  } else {
    console.log("Could not find matching '];'");
  }
}
