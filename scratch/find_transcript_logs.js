import fs from 'fs';

const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b4dcdfa6-01de-4172-9ec8-2fba702b3070/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = content.split('\n');

lines.forEach((line) => {
  if (line.includes('[DB SYNC]')) {
    console.log(line);
  }
});
