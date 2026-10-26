import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const courses = [
  "AI Foundations",
  "Design Smarter with Canva",
  "Freelance Course (Hindi)",
  "Mobile Video Editing",
  "english grammar"
];

courses.forEach(course => {
  console.log(`\n=== Course: ${course} ===`);
  const indices = [];
  lines.forEach((line, idx) => {
    if (line.includes(`courseName: "${course}"`)) {
      indices.push(idx + 1);
    }
  });
  console.log(`Occurs at lines: ${indices.join(', ')}`);
  if (indices.length > 0) {
    // Print lines around the first occurrence
    const startIdx = Math.max(0, indices[0] - 10);
    const endIdx = Math.min(lines.length, indices[0] + 10);
    console.log(`Context around line ${indices[0]}:`);
    for (let i = startIdx; i < endIdx; i++) {
      console.log(`  ${i + 1}: ${lines[i]}`);
    }
  }
});
