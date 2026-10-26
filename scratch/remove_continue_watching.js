const fs = require('fs');
const path = 'c:/Users/HP/OneDrive/Desktop/course app 2/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// We want to find:
// {/* Continue Watching Section */}
// {false && (
//   null
//   ...
// )}
// And replace it with empty string.

// Let's use a regex that matches this block precisely.
const regex = /\{\/\* Continue Watching Section \*\/\}[\s\S]*?\{false && \([\s\S]*?\}\)/;
if (regex.test(content)) {
  content = content.replace(regex, '');
  fs.writeFileSync(path, content, 'utf8');
  console.log('SUCCESS: Continue Watching Section successfully removed!');
} else {
  console.log('ERROR: Regex did not match the block!');
}
