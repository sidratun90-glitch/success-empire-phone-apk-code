import fs from 'fs';

const content = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b4dcdfa6-01de-4172-9ec8-2fba702b3070/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = content.split('\n');

const toolOutputs = [];
lines.forEach((line) => {
  if (line.includes('capture_browser_console_logs')) {
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        // This is the model call
      } else if (obj.content) {
        // This is the tool response
        toolOutputs.push(obj.content);
      }
    } catch (e) {}
  }
});

console.log(`Found ${toolOutputs.length} capture_browser_console_logs responses.`);
if (toolOutputs.length > 0) {
  console.log("Last response length:", toolOutputs[toolOutputs.length - 1].length);
  fs.writeFileSync('c:/course app 3/scratch/last_console_response.json', toolOutputs[toolOutputs.length - 1]);
}
