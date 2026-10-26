import fs from 'fs';

const targetCourses = [
  'AI Prompt Engineering',
  'AI Prompt Engineering (Tamil)',
  'Advanced Instagram Course 2.0',
  'Google Ads Course',
  'Google Ads (Telugu)',
  'Mastering Facebook Ads',
  'Performance Marketing Unlocked',
  'Instagram Growth Course (tamil)',
  'Instagram marketing automation',
  'LinkedIn Growth Guide',
  'Master Professional E-mail Writing',
  'Expert Guide To Resume Writing',
  'Ace The Interview',
  'Podcasting Pro',
  'youtube domination',
  'Masterclass in Digital Marketing',
  'The Art of Smart Copywriting',
  'Complete Guide to Freelancing (Kannada)'
];

const futureContent = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
const appContent = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

targetCourses.forEach(course => {
  const inFuture = futureContent.includes(`courseName: "${course}"`) || futureContent.includes(`courseName: '${course}'`);
  const inApp = appContent.includes(`courseName: "${course}"`) || appContent.includes(`courseName: '${course}'`);
  console.log(`Course: "${course}" | In futureCourses.js: ${inFuture} | In App.jsx: ${inApp}`);
});
