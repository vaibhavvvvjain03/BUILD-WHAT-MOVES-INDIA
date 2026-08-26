const fs = require('fs');
const content = fs.readFileSync('lib/serviceCatalog.ts', 'utf8');

const strings = new Set(['available', 'limited', 'not available']);

const feesMatch = content.match(/description:\s*['\"]([^'\"]+)['\"]/g);
if (feesMatch) {
  feesMatch.forEach(m => {
    strings.add(m.match(/description:\s*['\"]([^'\"]+)['\"]/)[1]);
  });
}

const timeMatch = content.match(/estimatedTime:\s*['\"]([^'\"]+)['\"]/g);
if (timeMatch) {
  timeMatch.forEach(m => {
    strings.add(m.match(/estimatedTime:\s*['\"]([^'\"]+)['\"]/)[1]);
  });
}

const stateMatch = content.match(/states:\s*\[([\s\S]*?)\]/g);
if (stateMatch) {
  stateMatch.forEach(r => {
    const listMatch = r.match(/\[([\s\S]*?)\]/);
    if(listMatch){
        listMatch[1].split(',').forEach(item => {
            const clean = item.trim().replace(/^['\"]|['\"]$/g, '');
            if(clean && !clean.includes('//')) strings.add(clean);
        });
    }
  });
}

// And anything else
strings.add('Service Not Found');
strings.add("The service you're looking for doesn't exist.");
strings.add('Return to Services');
strings.add('All States (Mock: Karnataka enabled)');
strings.add('Approx. 10-15 minutes');
strings.add('Approx. 10-15 minutes online');
strings.add('Subject to specific service rules');
strings.add('Base renewal fee (additional late fees may apply)');
strings.add('Standard eligibility rules apply');
strings.add('Standard Documents');
strings.add('Authenticate via Aadhaar.');
strings.add('Upload required documents.');
strings.add('Pay the processing fee.');
strings.add('Apply for the renewal of your existing Driving Licence online.');
strings.add('Holder of a valid Indian Driving Licence');
strings.add('Licence is expired or expiring within 1 year');
strings.add('Current Driving Licence');
strings.add('Proof of Address');
strings.add('Form 1A (Medical Certificate)');
strings.add('Required if above 40 years of age');
strings.add('Ensure your mobile number is linked to Aadhaar');
strings.add('Keep scanned copies of required documents ready (JPEG/PDF, max 2MB)');
strings.add('Service Not Found');
strings.add("The service you're looking for doesn't exist.");
strings.add('Return to Services');

const transPath = './lib/translations.ts';
let transContent = fs.readFileSync(transPath, 'utf8');
const matchBlock = transContent.match(/const translations[^=]*=\s*(\{[\s\S]*?\});\s*export function/);
let objStr = matchBlock[1];

let added = 0;
strings.forEach(s => {
  const key = '\"' + s.replace(/\"/g, '\\\\\"') + '\"';
  if (!objStr.includes(key + ':') && !objStr.includes(key + ' :')) {
    const insertPos = objStr.lastIndexOf('}');
    objStr = objStr.slice(0, insertPos) + '  ' + key + ': { en: \"' + s.replace(/\"/g, '\\\\\"') + '\" },\n' + objStr.slice(insertPos);
    added++;
  }
});

fs.writeFileSync(transPath, transContent.replace(matchBlock[1], objStr), 'utf8');
console.log('Added ' + added + ' more keys to translations.ts');
