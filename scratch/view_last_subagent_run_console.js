import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/scratch/subagent_logs.txt', 'utf8');
const sections = content.split('=== Step ');

// Find the section that contains console logs
sections.forEach(sec => {
  if (sec.includes('console-api') || sec.includes('text')) {
    console.log("=== Found Section ===");
    const lines = sec.split('\n');
    lines.forEach(l => {
      if (l.includes('[DB SYNC]') || l.includes('error') || l.includes('Error')) {
        console.log(l);
      }
    });
  }
});
