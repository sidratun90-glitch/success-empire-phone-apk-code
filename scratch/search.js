import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const searchTerms = ['PACKAGES', 'DEFAULT_TRENDING_COURSES', 'dropshippingImg', 'standardPkgImg'];

searchTerms.forEach(term => {
  console.log(`Searching for "${term}":`);
  let count = 0;
  lines.forEach((line, idx) => {
    if (line.includes(term)) {
      count++;
      if (count <= 20) {
        console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 100)}`);
      }
    }
  });
  console.log(`Total found: ${count}\n`);
});
