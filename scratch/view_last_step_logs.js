import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/scratch/subagent_logs.txt', 'utf8');
const sections = content.split('=== Step ');

// Print the last section
if (sections.length > 1) {
  console.log('=== Step ' + sections[sections.length - 1]);
} else {
  console.log("No sections found!");
}
