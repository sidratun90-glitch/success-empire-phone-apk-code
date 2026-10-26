import { execSync } from 'child_process';

try {
  console.log("=== Git Status ===");
  console.log(execSync('git status', { encoding: 'utf8' }));
  
  console.log("\n=== Git Diff ===");
  console.log(execSync('git diff', { encoding: 'utf8' }));
} catch (err) {
  console.error("Error executing git command:", err.message);
  if (err.stdout) console.log("STDOUT:", err.stdout);
  if (err.stderr) console.error("STDERR:", err.stderr);
}
