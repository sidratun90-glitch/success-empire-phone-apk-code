import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const arrays = [
  "facebookAdsLessons",
  "youtubeMasteryLessons",
  "instagramMarketingLessons",
  "freelancingLessons",
  "chatgptLessons",
  "videoEditingLessons",
  "aiMasterClassLessons",
  "valueInvestingLessons",
  "premiereProLessons",
  "contentMarketingLessons",
  "mobileVideoLessons",
  "canvaLessons",
  "englishGrammarLessons"
];

lines.forEach((line, idx) => {
  arrays.forEach(arrName => {
    if (line.includes(`const ${arrName}`) || line.includes(`let ${arrName}`)) {
      console.log(`${idx + 1}: ${line}`);
    }
  });
});
