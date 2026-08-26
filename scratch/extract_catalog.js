const fs = require('fs');

const content = fs.readFileSync('lib/serviceCatalog.ts', 'utf8');
const regex = /(?<!import.*)('[^']+'|"[^"]+")/g;
let matches = [...content.matchAll(regex)];

const uniqueStrings = new Set();
for (let match of matches) {
    let str = match[1].slice(1, -1);
    if (str.length > 2 && !['preview', 'implemented', 'online', 'may-require-visit', 'required', 'conditional', 'available', 'limited', 'not-available'].includes(str)) {
        uniqueStrings.add(str);
    }
}

let newEntries = [];
for (let str of uniqueStrings) {
    let escapedStr = str.replace(/"/g, '\\"');
    newEntries.push(`  "${escapedStr}": { en: "${escapedStr}" },`);
}

console.log(newEntries.join('\n'));
