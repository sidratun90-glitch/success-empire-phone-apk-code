import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'id: \"premium_plus_lesson_meta_ads_sell_0\"':");
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_meta_ads_sell_0"')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
