import fs from 'fs';

const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b4dcdfa6-01de-4172-9ec8-2fba702b3070/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('capture_browser_console_logs')) {
    try {
      const obj = JSON.parse(line);
      console.log(`Line ${idx + 1}: step_index = ${obj.step_index}, source = ${obj.source}, type = ${obj.type}`);
    } catch (e) {}
  }
});
