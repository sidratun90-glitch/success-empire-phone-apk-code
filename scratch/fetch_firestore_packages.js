import fs from 'fs';

async function fetchPackages() {
  const url = 'https://firestore.googleapis.com/v1/projects/course-app-d2a50/databases/(default)/documents/packages';
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.documents) {
      console.log("No documents found in Firestore /packages collection.");
      console.log(JSON.stringify(data, null, 2));
      return;
    }
    console.log(`Found ${data.documents.length} packages in Firestore:`);
    data.documents.forEach(doc => {
      const fields = doc.fields;
      const id = fields.id ? (fields.id.integerValue || fields.id.stringValue) : 'unknown';
      const title = fields.title ? fields.title.stringValue : 'unknown';
      let lessonCount = 0;
      if (fields.lessons && fields.lessons.arrayValue && fields.lessons.arrayValue.values) {
        lessonCount = fields.lessons.arrayValue.values.length;
      }
      console.log(`- Package ID: ${id}, Title: "${title}", Lesson Count in Firestore: ${lessonCount}`);
    });
  } catch (err) {
    console.error("Failed to fetch packages from Firestore:", err);
  }
}

fetchPackages();
