import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/scratch/subagent_logs.txt', 'utf8');
const lines = content.split('\n');

lines.forEach((line) => {
  if (line.includes('[DB SYNC]')) {
    console.log(line);
  }
});
