import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Locating insert positions in App.jsx...");

// 1. Find processPackagesSnapshot declaration
const declIdx = lines.findIndex(l => l.includes('const processPackagesSnapshot = (snapshot) => {'));
if (declIdx === -1) throw new Error("Could not find processPackagesSnapshot");
console.log(`Found declaration at line ${declIdx + 1}`);

// 2. Find lessonsList assignment in Premium Plus
const lessonsListFilterIdx = lines.findIndex((l, idx) => l.includes('pkgData.lessons = lessonsList.filter(') && idx > 20900);
if (lessonsListFilterIdx === -1) throw new Error("Could not find lessonsList filter assignment");
console.log(`Found lessonsList filter assignment at line ${lessonsListFilterIdx + 1}`);

// 3. Find end of processPackagesSnapshot rawPackages loop
const loopEndIdx = lines.findIndex((l, idx) => l.trim() === 'list.sort((a, b) => (Number(a.level) || 0) - (Number(b.level) || 0));');
if (loopEndIdx === -1) throw new Error("Could not find list.sort");
console.log(`Found list.sort at line ${loopEndIdx + 1}`);

// Perform insertions
// Insert 'let globalLessonsList = null;' inside processPackagesSnapshot
lines.splice(declIdx + 1, 0, '  let globalLessonsList = null;');

// Offset is now +1
// Insert 'globalLessonsList = lessonsList;'
lines.splice(lessonsListFilterIdx + 2, 0, '      globalLessonsList = lessonsList;');

// Offset is now +2
// Insert the sync block before list.sort
const syncBlock = `
  // Auto-sync packages to Firestore if current user is admin
  const currentEmail = localStorage.getItem('course_app_user_email') || '';
  const isAdmin = currentEmail.toLowerCase() === 'parwejhayat3@gmail.com';
  if (isAdmin && globalLessonsList) {
    setTimeout(async () => {
      // 1. Sync Premium Plus Package (2000000000003)
      const plusPkg = rawPackages.find(p => Number(p.id) === 2000000000003);
      if (plusPkg) {
        const dbLessons = plusPkg.lessons || [];
        const fbLesson0 = dbLessons.find(l => l && l.id === "premium_plus_lesson_fb");
        const pruLesson0 = dbLessons.find(l => l && l.id === "premium_plus_lesson_premiere_pro_unlocked_0");
        const cmLesson0 = dbLessons.find(l => l && l.id === "premium_plus_lesson_content_marketing_0");
        const pruCount = dbLessons.filter(l => l && l.courseName === "Premiere Pro Unlocked").length;

        const fbNeeds = !fbLesson0 || !fbLesson0.videoUrls || fbLesson0.videoUrl.includes("youtube.com");
        const pruNeeds = !pruLesson0 || !pruLesson0.videoUrls || pruLesson0.videoUrl.includes("youtube.com") || pruCount !== 14;
        const cmNeeds = !cmLesson0 || !cmLesson0.videoUrls || cmLesson0.videoUrl.includes("youtube.com");

        if (fbNeeds || pruNeeds || cmNeeds) {
          console.log("[DB SYNC] Premium Plus Package needs update in Firestore.");
          try {
            const docRef = doc(db, "packages", "2000000000003");
            const dbPkg = { ...plusPkg, lessons: globalLessonsList };
            dbPkg.thumbnail = getDbThumbnail(dbPkg);
            delete dbPkg.originalThumbnail;
            await setDoc(docRef, dbPkg);
            console.log("[DB SYNC] Premium Plus Package updated successfully in Firestore!");
          } catch (err) {
            console.error("[DB SYNC] Failed to update Premium Plus Package in Firestore:", err);
          }
        }
      }

      // 2. Sync Standard Package (2000000000000)
      const standardPkg = rawPackages.find(p => Number(p.id) === 2000000000000);
      if (standardPkg) {
        const dbLessons = standardPkg.lessons || [];
        const fbLesson0 = dbLessons.find(l => l && l.id === "premium_plus_lesson_fb");
        const fbNeeds = !fbLesson0 || !fbLesson0.videoUrls || fbLesson0.videoUrl.includes("youtube.com");
        
        if (fbNeeds) {
          console.log("[DB SYNC] Standard Package needs update in Firestore.");
          try {
            const updatedFbLessons = globalLessonsList.filter(l => l && l.courseName === "Mastering Facebook Ads");
            const otherLessons = dbLessons.filter(l => l && l.courseName !== "Mastering Facebook Ads");
            const docRef = doc(db, "packages", "2000000000000");
            const dbPkg = { ...standardPkg, lessons: [...otherLessons, ...updatedFbLessons] };
            dbPkg.thumbnail = getDbThumbnail(dbPkg);
            delete dbPkg.originalThumbnail;
            await setDoc(docRef, dbPkg);
            console.log("[DB SYNC] Standard Package updated successfully in Firestore!");
          } catch (err) {
            console.error("[DB SYNC] Failed to update Standard Package in Firestore:", err);
          }
        }
      }
    }, 100);
  }
`;

lines.splice(loopEndIdx + 2, 0, syncBlock);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("Successfully injected Firestore auto-sync block in App.jsx!");
