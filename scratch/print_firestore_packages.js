import fs from 'fs';

async function checkDb() {
  const url = 'https://firestore.googleapis.com/v1/projects/course-app-d2a50/databases/(default)/documents/packages';
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.documents) {
      console.log("No documents found in Firestore /packages collection.");
      return;
    }
    
    console.log(`Found ${data.documents.length} packages in Firestore:`);
    data.documents.forEach(doc => {
      const fields = doc.fields;
      const id = fields.id ? (fields.id.integerValue || fields.id.stringValue) : 'unknown';
      const title = fields.title ? fields.title.stringValue : 'unknown';
      
      let lessons = [];
      if (fields.lessons && fields.lessons.arrayValue && fields.lessons.arrayValue.values) {
        lessons = fields.lessons.arrayValue.values.map(val => {
          const map = val.mapValue ? val.mapValue.fields : {};
          return {
            id: map.id ? map.id.stringValue : '',
            title: map.title ? map.title.stringValue : '',
            courseName: map.courseName ? map.courseName.stringValue : ''
          };
        });
      }
      
      const uniqueCourses = Array.from(new Set(lessons.map(l => l.courseName).filter(Boolean)));
      console.log(`\n- Package ID: ${id}`);
      console.log(`  Title: "${title}"`);
      console.log(`  Lesson Count: ${lessons.length}`);
      console.log(`  Courses inside this package:`, uniqueCourses);
    });
  } catch (err) {
    console.error("Failed to check Firestore packages:", err);
  }
}

checkDb();
