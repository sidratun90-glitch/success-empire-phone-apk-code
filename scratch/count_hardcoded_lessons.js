import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

// List of arrays we spread into lessonsList
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

arrays.forEach(arrName => {
  // Find definition: const arrName = [ ... ];
  const regex = new RegExp(`const\\s+${arrName}\\s*=\\s*\\[([\\s\\S]*?)\\];\\r?\\n`);
  const match = regex.exec(content);
  if (match) {
    // Count occurrences of id:
    const ids = (match[1].match(/id:/g) || []).length;
    console.log(`${arrName} count: ${ids}`);
  } else {
    console.log(`${arrName} not found!`);
  }
});
