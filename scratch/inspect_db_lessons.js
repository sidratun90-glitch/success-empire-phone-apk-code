import fs from 'fs';

async function inspectDbLessons() {
  const url = 'https://firestore.googleapis.com/v1/projects/course-app-d2a50/databases/(default)/documents/packages';
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.documents) {
      console.log("No documents found in Firestore /packages collection.");
      return;
    }
    
    for (let doc of data.documents) {
      const fields = doc.fields;
      const id = fields.id ? (fields.id.integerValue || fields.id.stringValue) : 'unknown';
      const title = fields.title ? fields.title.stringValue : 'unknown';
      
      console.log(`\n=================== PACKAGE ID: ${id} (${title}) ===================`);
      if (fields.lessons && fields.lessons.arrayValue && fields.lessons.arrayValue.values) {
        const lessons = fields.lessons.arrayValue.values;
        console.log(`Total lessons in Firestore: ${lessons.length}`);
        
        // Let's count how many belong to each courseName
        const courseCounts = {};
        lessons.forEach(lVal => {
          const lFields = lVal.mapValue.fields;
          const courseName = lFields.courseName ? lFields.courseName.stringValue : 'unknown';
          courseCounts[courseName] = (courseCounts[courseName] || 0) + 1;
        });
        console.log("Lessons per course in Firestore:", courseCounts);
        
        // Print the first 2 lessons of "Mastering Facebook Ads" if any
        let printedCount = 0;
        for (let lVal of lessons) {
          const lFields = lVal.mapValue.fields;
          const courseName = lFields.courseName ? lFields.courseName.stringValue : 'unknown';
          if (courseName === 'Mastering Facebook Ads') {
            printedCount++;
            if (printedCount <= 3) {
              console.log(`  Lesson ${printedCount}:`);
              console.log(`    id: ${lFields.id ? lFields.id.stringValue : 'none'}`);
              console.log(`    title: ${lFields.title ? lFields.title.stringValue : 'none'}`);
              console.log(`    videoUrl: ${lFields.videoUrl ? lFields.videoUrl.stringValue : 'none'}`);
            }
          }
        }
      } else {
        console.log("No lessons in Firestore for this package.");
      }
    }
  } catch (err) {
    console.error("Failed to inspect lessons in Firestore:", err);
  }
}

inspectDbLessons();
