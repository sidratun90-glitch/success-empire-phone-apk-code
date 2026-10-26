import { futureLessons } from '../src/data/futureCourses.js';

const courses = new Map();
futureLessons.forEach(lesson => {
  if (!courses.has(lesson.courseName)) {
    courses.set(lesson.courseName, {
      name: lesson.courseName,
      packageId: lesson.packageId
    });
  }
});

console.log("All Unique Courses and their Package IDs:");
for (const course of courses.values()) {
  console.log(`- "${course.name}": ${course.packageId}`);
}
