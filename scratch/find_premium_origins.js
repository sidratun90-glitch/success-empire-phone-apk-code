import fs from 'fs';

const targetCourses = [
  'ChatGPT & Claude Mastery (Telugu)',
  'Complete Guide to Freelancing (Tamil)',
  'Gemini & NotebookLM (Telugu)',
  'Mobile Video Editing (Tamil)',
  'Adobe Premiere Pro Course',
  'Advanced Excel Mastery',
  'Advanced Public Speaking',
  'Cloud Kitchen Startup Guide',
  'Commcraft',
  'Creative suite mastery',
  'FL Studio Mastery Crash Course',
  'Freelance Course (English)',
  'Marketing Mindset',
  'Mastering AI Tools for Success',
  'Meta Ads Beginner to Advance',
  'Python Decoded',
  'Sales Pro',
  'Smart Automation: Instagram & WhatsApp',
  'premiere pro reloaded',
  'Short VideoPreneur',
  'Content Marketing'
];

const futureContent = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
const appContent = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

targetCourses.forEach(course => {
  const inFuture = futureContent.includes(`courseName: "${course}"`) || futureContent.includes(`courseName: '${course}'`);
  const inApp = appContent.includes(`courseName: "${course}"`) || appContent.includes(`courseName: '${course}'`);
  console.log(`Course: "${course}" | In futureCourses.js: ${inFuture} | In App.jsx: ${inApp}`);
});
