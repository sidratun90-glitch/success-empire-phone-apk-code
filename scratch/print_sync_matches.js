import fs from 'fs';

const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b4dcdfa6-01de-4172-9ec8-2fba702b3070/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = content.split('\n');

const matches = [];
lines.forEach((line) => {
  if (line.includes('[DB SYNC]')) {
    try {
      const obj = JSON.parse(line);
      if (obj.content && obj.content.includes('[DB SYNC]')) {
        matches.push(obj.content);
      }
    } catch (e) {}
  }
});

fs.writeFileSync('c:/course app 3/scratch/sync_logs.txt', matches.join('\n'));
console.log(`Saved ${matches.length} matches to scratch/sync_logs.txt`);
