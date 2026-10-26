import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');

// Parse coursePackages from the file
const coursePackagesStart = content.indexOf('const coursePackages = {');
const coursePackagesEnd = content.indexOf('};', coursePackagesStart);
const coursePackagesText = content.substring(coursePackagesStart, coursePackagesEnd + 2);

console.log("--- Course Packages Section in futureCourses.js ---");
console.log(coursePackagesText);

const userCourses = [
  "AI Foundations",
  "AI Master Class 1.0",
  "AI Foundations (Telugu)",
  "Design Smarter with Canva",
  "Design Smarter with Canva (Tamil)",
  "Freelance Course (Hindi)",
  "Mobile Video Editing",
  "Mobile Video Editing (Kannada)",
  "Wondershare Filmora",
  "UGC Course",
  "Ultimate Instagram Growth",
  "english grammar"
];

// Let's extract all unique course names from the actual lessons inside futureLessonsData to verify them
const courseNames = new Set();
const matches = content.matchAll(/courseName:\s*["']([^"']+)["']/g);
for (const match of matches) {
  courseNames.add(match[1]);
}

console.log("\n--- Checking User Courses ---");
userCourses.forEach(uc => {
  const exactInPackages = coursePackagesText.includes(`"${uc}"`) || coursePackagesText.includes(`'${uc}'`);
  const exactInLessons = courseNames.has(uc);
  
  // Find case-insensitive/partial matches
  const partialMatches = Array.from(courseNames).filter(c => c.toLowerCase().includes(uc.toLowerCase()));
  
  console.log(`User Course: "${uc}"`);
  console.log(`  - Exact match in coursePackages: ${exactInPackages}`);
  console.log(`  - Exact match in futureLessonsData: ${exactInLessons}`);
  if (partialMatches.length > 0) {
    console.log(`  - Partial matches in lessons: ${JSON.stringify(partialMatches)}`);
  } else {
    console.log(`  - Partial matches in lessons: NONE`);
  }
});
