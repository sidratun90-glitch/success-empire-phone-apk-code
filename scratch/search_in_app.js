import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

const targetCourses = [
  "AI Foundations",
  "Design Smarter with Canva",
  "Freelance Course (Hindi)",
  "Mobile Video Editing",
  "english grammar"
];

console.log("Searching in App.jsx:");
targetCourses.forEach(tc => {
  console.log(`\nTarget: "${tc}"`);
  
  // Let's do a case-insensitive search and print matching lines
  const lines = content.split('\n');
  let foundCount = 0;
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(tc.toLowerCase())) {
      foundCount++;
      if (foundCount <= 10) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
      }
    }
  });
  console.log(`  Total occurrences: ${foundCount}`);
});
