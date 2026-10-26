import fs from 'fs';

const logs = JSON.parse(fs.readFileSync('c:/course app 3/scratch/last_console_response.json', 'utf8'));
console.log(`Loaded ${logs.length} logs.`);

logs.forEach(log => {
  if (log.text && (log.text.includes('[DB SYNC]') || log.text.includes('error') || log.text.includes('Error') || log.text.includes('Firebase'))) {
    console.log(`[${log.type || 'log'}] ${log.text}`);
  }
});
