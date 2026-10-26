const fs = require('fs');
const path = 'C:/Users/HP/.gemini/antigravity-ide/brain/1581b616-3d13-4d3e-b797-c2f4825cfa33/.system_generated/logs/transcript.jsonl';
if (fs.existsSync(path)) {
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  lines.filter(l => l.includes('"type":"USER_INPUT"')).slice(-5).forEach(l => {
    try {
      console.log('--- USER MSG ---');
      console.log(JSON.parse(l).content);
    } catch(e) {}
  });
}
