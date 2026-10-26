import fs from 'fs';

const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b4dcdfa6-01de-4172-9ec8-2fba702b3070/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = content.split('\n');

const logs = [];
lines.forEach((line) => {
  if (line.includes('capture_browser_console_logs')) {
    try {
      const obj = JSON.parse(line);
      if (obj.content) {
        logs.push(`=== Step ${obj.step_index} ===\n${obj.content}`);
      }
    } catch (e) {}
  }
});

fs.writeFileSync('c:/course app 3/scratch/subagent_logs.txt', logs.join('\n\n'));
console.log(`Saved ${logs.length} subagent logs to scratch/subagent_logs.txt`);
