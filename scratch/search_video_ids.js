import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const ids = [
  'BDJJY3K9Wt4',
  'Ocx2Zux7Iqw',
  'RvRze1kdMjs',
  'NaIiIjluTKc',
  'tqR-Fbt0iKo',
  'MwPV04wTETk',
  'OmACWdAmej4',
  '7ZjWNF8Fje4',
  'tJsMXdpjC6k',
  'AJmqHMHnngo',
  'Ph7SxFTkF2k',
  'owslff7Efi4',
  'GlKWbMZS7EY'
];

ids.forEach(id => {
  lines.forEach((line, idx) => {
    if (line.includes(id)) {
      console.log(`Found ID ${id} at Line ${idx + 1}: ${line.trim()}`);
    }
  });
});
