import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

// We count occurrences of "id:" inside lessonsList definition (lines 21053 to 29155)
let idCount = 0;
for (let i = 21052; i < 29155; i++) {
  const line = lines[i];
  if (line.includes('id:')) {
    idCount++;
  }
}

console.log(`Total lesson IDs in lessonsList: ${idCount}`);
