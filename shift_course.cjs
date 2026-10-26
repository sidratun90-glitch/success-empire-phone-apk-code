// ==============================================================================
// 📦 SUCCESS EMPIRE - DUAL SYNC COURSE SHIFT TOOL (APP 9 & APP 3)
// ==============================================================================
// Usage:
// 1. Interactive : npm run shift-course
// 2. Direct CLI  : npm run shift-course "Course Name" "Package Name or Number"
//
// Automatically updates src/data/futureCourses.js in BOTH:
// - Website (Course App 9)
// - Application (Course App 3)
// With automatic timestamped backups before updating!
// ==============================================================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const vm = require('vm');

const TARGET_PROJECTS = [
    { name: 'Website (Course App 9)', path: 'C:\\cousre code\\course app 9' },
    { name: 'Application (Course App 3)', path: 'C:\\cousre code\\course app 3' }
].filter(p => fs.existsSync(p.path));

const AVAILABLE_PACKAGES = [
    { num: 1, name: 'Supreme Package', id: 2000000000001, keywords: ['supreme', '1'] },
    { num: 2, name: 'Premium Package', id: 2000000000002, keywords: ['premium', '2'] },
    { num: 3, name: 'Premium Plus Package', id: 2000000000003, keywords: ['premium plus', 'plus', 'premium_plus', '3'] },
    { num: 4, name: 'Creator Package', id: 2000000000004, keywords: ['creator', '4'] },
    { num: 5, name: 'Standard Package', id: 2000000000000, keywords: ['standard', 'pro', '5'] }
];

const PKG_NAME_MAP = {
    2000000000000: 'Standard Package',
    2000000000001: 'Supreme Package',
    2000000000002: 'Premium Package',
    2000000000003: 'Premium Plus Package',
    2000000000004: 'Creator Package'
};

function getCoursesWithPackages(projPath) {
    const targetFile = path.join(projPath, 'src', 'data', 'futureCourses.js');
    if (!fs.existsSync(targetFile)) return [];
    const code = fs.readFileSync(targetFile, 'utf8');

    // 1. Extract coursePackages mapping
    const cpMatch = code.match(/const coursePackages = \{([\s\S]*?)\};/);
    const coursePackages = {};
    if (cpMatch) {
        const lines = cpMatch[1].split('\n');
        for (const line of lines) {
            const m = line.match(/["']([^"']+)["']\s*:\s*(\d+)/);
            if (m) {
                coursePackages[m[1]] = Number(m[2]);
            }
        }
    }

    // 2. Extract unique courseNames
    const courseRegex = /courseName:\s*["'`]([^"'`]+)["'`]/g;
    const courses = new Set();
    let m;
    while ((m = courseRegex.exec(code)) !== null) {
        courses.add(m[1]);
    }

    const list = [];
    courses.forEach(c => {
        let pkgId = coursePackages[c];
        if (pkgId === undefined) {
            const escaped = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`courseName:\\s*["'\`]${escaped}["'\`][\\s\\S]*?packageId:\\s*(\\d+)`);
            const lm = code.match(regex);
            if (lm) pkgId = Number(lm[1]);
        }
        list.push({
            name: c,
            packageId: pkgId,
            packageName: PKG_NAME_MAP[pkgId] || (pkgId ? `ID ${pkgId}` : 'Unknown')
        });
    });

    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
}

function shiftCourseInCode(sourceCode, courseName, newPackageId) {
    let updatedCode = sourceCode;

    // 1. Update or Insert in coursePackages
    const cpMatch = updatedCode.match(/const coursePackages = \{([\s\S]*?)\};/);
    if (cpMatch) {
        const cpBody = cpMatch[1];
        const escapedCourse = courseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const courseInCpRegex = new RegExp(`(["'\`]${escapedCourse}["'\`]\\s*:\\s*)\\d+`);

        if (courseInCpRegex.test(cpBody)) {
            const newCpBody = cpBody.replace(courseInCpRegex, `$1${newPackageId}`);
            updatedCode = updatedCode.replace(cpMatch[0], `const coursePackages = {${newCpBody}};`);
        } else {
            const newCpBody = `\n  "${courseName}": ${newPackageId},` + cpBody;
            updatedCode = updatedCode.replace(cpMatch[0], `const coursePackages = {${newCpBody}};`);
        }
    }

    // 2. Update packageId inside futureLessonsData for all lessons of this course
    const startMarker = 'const futureLessonsData = [';
    const endMarker = 'export const futureLessons';

    const startIdx = updatedCode.indexOf(startMarker);
    const endIdx = updatedCode.indexOf(endMarker, startIdx);

    if (startIdx !== -1 && endIdx !== -1) {
        const header = updatedCode.slice(0, startIdx + startMarker.length);
        const bodyAndTail = updatedCode.slice(startIdx + startMarker.length);
        const closingBracketIdx = bodyAndTail.lastIndexOf('];', bodyAndTail.indexOf(endMarker));

        if (closingBracketIdx !== -1) {
            const body = bodyAndTail.slice(0, closingBracketIdx);
            const tail = bodyAndTail.slice(closingBracketIdx);

            const lessons = [];
            let current = '';
            let depth = 0;
            let inString = false;
            let stringChar = '';

            for (let i = 0; i < body.length; i++) {
                const char = body[i];
                const prevChar = i > 0 ? body[i - 1] : '';

                if (inString) {
                    current += char;
                    if (char === stringChar && prevChar !== '\\') inString = false;
                    continue;
                }

                if (char === '"' || char === "'" || char === '`') {
                    inString = true;
                    stringChar = char;
                    current += char;
                    continue;
                }

                if (char === '{') {
                    depth++;
                    current += char;
                } else if (char === '}') {
                    depth--;
                    current += char;
                    if (depth === 0) {
                        lessons.push(current.trim());
                        current = '';
                    }
                } else {
                    if (depth > 0) current += char;
                }
            }

            const updatedLessons = lessons.map(lesson => {
                const escapedCourse = courseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const courseRegex = new RegExp(`courseName:\\s*["'\`]${escapedCourse}["'\`]`);
                if (courseRegex.test(lesson)) {
                    if (/packageId:\s*\d+/.test(lesson)) {
                        return lesson.replace(/packageId:\s*\d+/, `packageId: ${newPackageId}`);
                    } else {
                        const lastBrace = lesson.lastIndexOf('}');
                        return lesson.slice(0, lastBrace).trimEnd() + `,\n    packageId: ${newPackageId}\n  }`;
                    }
                }
                return lesson;
            });

            const newBody = '\n  ' + updatedLessons.join(',\n  ') + '\n';
            updatedCode = header + newBody + tail;
        }
    }

    return updatedCode;
}

function validateJsSyntax(code) {
    try {
        const testable = code
            .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
            .replace(/export\s+const\s+/g, 'const ');
        new vm.Script(testable);
        return true;
    } catch (e) {
        throw new Error('JavaScript syntax check failed: ' + e.message);
    }
}

function executeShift(courseName, targetPackage) {
    console.log(`\n\x1b[36m==============================================================================\x1b[0m`);
    console.log(`\x1b[1m\x1b[33m⚡ SHIFTING COURSE: "${courseName}"\x1b[0m`);
    console.log(`\x1b[32m🎯 TARGET PACKAGE: ${targetPackage.name} (ID: ${targetPackage.id})\x1b[0m`);
    console.log(`\x1b[36m==============================================================================\x1b[0m\n`);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let totalUpdated = 0;

    TARGET_PROJECTS.forEach(proj => {
        const filePath = path.join(proj.path, 'src', 'data', 'futureCourses.js');
        if (!fs.existsSync(filePath)) {
            console.log(`\x1b[33m⚠️ Skipped ${proj.name}: File not found\x1b[0m`);
            return;
        }

        const currentCode = fs.readFileSync(filePath, 'utf8');

        // Create Backup
        const backupDir = path.join(proj.path, 'src', 'data', 'backups');
        if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
        const backupPath = path.join(backupDir, `futureCourses_before_shift_${timestamp}.js`);
        fs.writeFileSync(backupPath, currentCode, 'utf8');

        // Shift Course
        const updatedCode = shiftCourseInCode(currentCode, courseName, targetPackage.id);

        // Validate Syntax
        validateJsSyntax(updatedCode);

        // Save
        fs.writeFileSync(filePath, updatedCode, 'utf8');
        console.log(`\x1b[32m✔ [${proj.name}] Course shifted to ${targetPackage.name}!\x1b[0m`);
        console.log(`  └─ Backup saved: ${path.basename(backupPath)}`);
        totalUpdated++;
    });

    if (totalUpdated > 0) {
        console.log(`\n\x1b[1m\x1b[32m🎉 SAFALTA! "${courseName}" safaltapoorvak "${targetPackage.name}" me shift ho gaya!\x1b[0m`);
        console.log(`\x1b[36mDono projects (Website & App) synchronize ho chuke hain.\x1b[0m\n`);
    } else {
        console.log(`\x1b[31m❌ Kisi bhi project me file update nahi ho saki.\x1b[0m\n`);
    }
}

function resolvePackageInput(input) {
    const raw = String(input).trim().toLowerCase();
    for (const pkg of AVAILABLE_PACKAGES) {
        if (String(pkg.num) === raw || String(pkg.id) === raw) return pkg;
        for (const kw of pkg.keywords) {
            if (raw === kw || raw.includes(kw)) return pkg;
        }
    }
    return null;
}

// ---------------------------------------------------------
// CLI & Interactive Handler
// ---------------------------------------------------------
const args = process.argv.slice(2);

// Collect courses from first available project
const refProj = TARGET_PROJECTS[0] || { path: process.cwd() };
const allCourses = getCoursesWithPackages(refProj.path);

if (allCourses.length === 0) {
    console.log(`\x1b[31m❌ Koi courses nahi mile src/data/futureCourses.js me!\x1b[0m`);
    process.exit(1);
}

// CLI Mode: arguments provided
if (args.length >= 2) {
    const courseArg = args[0].trim();
    const pkgArg = args[1].trim();

    // Match course
    let matchedCourse = allCourses.find(c => c.name.toLowerCase() === courseArg.toLowerCase());
    if (!matchedCourse && !isNaN(courseArg)) {
        const idx = parseInt(courseArg, 10) - 1;
        if (idx >= 0 && idx < allCourses.length) matchedCourse = allCourses[idx];
    }

    if (!matchedCourse) {
        console.log(`\x1b[31m❌ Course "${courseArg}" nahi mila!\x1b[0m`);
        process.exit(1);
    }

    const matchedPkg = resolvePackageInput(pkgArg);
    if (!matchedPkg) {
        console.log(`\x1b[31m❌ Package "${pkgArg}" invalid hai! Chunein: 1 (Supreme), 2 (Premium), 3 (Premium Plus), 4 (Creator), 5 (Standard)\x1b[0m`);
        process.exit(1);
    }

    executeShift(matchedCourse.name, matchedPkg);
    process.exit(0);
}

// Interactive Mode
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log(`\x1b[1m\x1b[36m==============================================================================\x1b[0m`);
console.log(`\x1b[1m\x1b[33m📦 SUCCESS EMPIRE - DUAL SYNC COURSE SHIFT TOOL (APP 9 & APP 3)\x1b[0m`);
console.log(`\x1b[1m\x1b[36m==============================================================================\x1b[0m`);
console.log(`\x1b[90mYeh tool kisi bhi course ko aasaani se dusre package me shift karta hai.\x1b[0m`);
console.log(`\x1b[90mWebsite (Course App 9) aur Application (Course App 3) dono me ek sath badlav hoga.\x1b[0m\n`);

console.log(`\x1b[1m\x1b[37m📋 Current Courses List (${allCourses.length} Courses available):\x1b[0m\n`);

allCourses.forEach((c, idx) => {
    const num = String(idx + 1).padStart(2, ' ');
    const pkgColor = c.packageId === 2000000000003 ? '\x1b[35m' : // Magenta (Plus)
                     c.packageId === 2000000000002 ? '\x1b[34m' : // Blue (Premium)
                     c.packageId === 2000000000001 ? '\x1b[32m' : // Green (Supreme)
                     c.packageId === 2000000000004 ? '\x1b[33m' : // Yellow (Creator)
                     '\x1b[36m';                                   // Cyan (Standard)

    console.log(`  \x1b[33m[${num}]\x1b[0m \x1b[1m${c.name.padEnd(46, ' ')}\x1b[0m ${pkgColor}→ [${c.packageName}]\x1b[0m`);
});

console.log(`\n\x1b[36m------------------------------------------------------------------------------\x1b[0m`);

rl.question(`\x1b[1m\x1b[32m👉 Kis course ko shift karna hai? (Course ka Number dalein ya Naam likhein): \x1b[0m`, (courseAnswer) => {
    const input = courseAnswer.trim();
    if (!input) {
        console.log(`\x1b[31m❌ Koi course nahi chuna gaya. Cancellation.\x1b[0m`);
        rl.close();
        return;
    }

    let selectedCourse = null;
    if (!isNaN(input)) {
        const idx = parseInt(input, 10) - 1;
        if (idx >= 0 && idx < allCourses.length) {
            selectedCourse = allCourses[idx];
        }
    } else {
        selectedCourse = allCourses.find(c => c.name.toLowerCase() === input.toLowerCase());
        if (!selectedCourse) {
            selectedCourse = allCourses.find(c => c.name.toLowerCase().includes(input.toLowerCase()));
        }
    }

    if (!selectedCourse) {
        console.log(`\x1b[31m❌ "${input}" naam ya number ka koi course nahi mila!\x1b[0m`);
        rl.close();
        return;
    }

    console.log(`\n\x1b[32m✔ Chuna gaya Course: \x1b[1m${selectedCourse.name}\x1b[0m`);
    console.log(`  Abhi yeh course \x1b[33m[${selectedCourse.packageName}]\x1b[0m mein hai.\n`);

    console.log(`\x1b[1m\x1b[37m🎯 Naya Package Chunein:\x1b[0m`);
    AVAILABLE_PACKAGES.forEach(pkg => {
        const isCurrent = pkg.id === selectedCourse.packageId ? ' \x1b[90m(Abhi isme hai)\x1b[0m' : '';
        console.log(`  \x1b[33m[${pkg.num}]\x1b[0m \x1b[1m${pkg.name}\x1b[0m${isCurrent}`);
    });

    console.log('');
    rl.question(`\x1b[1m\x1b[32m👉 Naye package ka Number dalein (1-5): \x1b[0m`, (pkgAnswer) => {
        const pkgInput = pkgAnswer.trim();
        const targetPkg = resolvePackageInput(pkgInput);

        if (!targetPkg) {
            console.log(`\x1b[31m❌ Galat package number. Operation cancelled.\x1b[0m`);
            rl.close();
            return;
        }

        if (targetPkg.id === selectedCourse.packageId) {
            console.log(`\n\x1b[33m⚠️ Course "${selectedCourse.name}" pehle se hi [${targetPkg.name}] mein hai!\x1b[0m`);
            rl.close();
            return;
        }

        console.log(`\n\x1b[36m------------------------------------------------------------------------------\x1b[0m`);
        console.log(`❓ Confirmation:`);
        console.log(`   Course       : \x1b[1m${selectedCourse.name}\x1b[0m`);
        console.log(`   Purana Pkg   : \x1b[31m${selectedCourse.packageName}\x1b[0m`);
        console.log(`   Naya Pkg     : \x1b[32m${targetPkg.name}\x1b[0m`);
        console.log(`\x1b[36m------------------------------------------------------------------------------\x1b[0m`);

        rl.question(`\x1b[1m\x1b[33mKya aap confirm karte hain? (y/n) [Default: y]: \x1b[0m`, (confirmAnswer) => {
            const confirm = confirmAnswer.trim().toLowerCase();
            if (confirm === '' || confirm === 'y' || confirm === 'yes' || confirm === 'haan') {
                executeShift(selectedCourse.name, targetPkg);
            } else {
                console.log(`\x1b[33m❌ Shift operation cancel kar diya gaya.\x1b[0m`);
            }
            rl.close();
        });
    });
});
