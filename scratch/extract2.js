const fs = require('fs');
const catalogPath = './lib/serviceCatalog.ts';
const content = fs.readFileSync(catalogPath, 'utf8');

const strings = new Set();
// extract from categories
const catsMatch = content.match(/export const serviceCategories = \[([\s\S]*?)\];/);
if (catsMatch) {
  catsMatch[1].split(',').forEach(c => {
    const s = c.trim().replace(/^['\"]|['\"]$/g, '');
    if (s && !s.includes('//')) strings.add(s);
  });
}

// extract from catalog names and shortDescriptions and eligibility and doc names
const nameRegex = /name:\s*['\"]([^'\"]+)['\"]/g;
const descRegex = /shortDescription:\s*['\"]([^'\"]+)['\"]/g;
const condRegex = /condition:\s*['\"]([^'\"]+)['\"]/g;
const idRegex = /generatePreview\([^,]+,\s*['\"]([^'\"]+)['\"],\s*['\"]([^'\"]+)['\"],\s*['\"]([^'\"]+)['\"]/g;

let m;
while ((m = nameRegex.exec(content)) !== null) strings.add(m[1]);
while ((m = descRegex.exec(content)) !== null) strings.add(m[1]);
while ((m = condRegex.exec(content)) !== null) strings.add(m[1]);
while ((m = idRegex.exec(content)) !== null) {
  strings.add(m[1]); // name
  strings.add(m[2]); // category
  strings.add(m[3]); // desc
}

const docNames = content.match(/{ name: ['\"]([^'\"]+)['\"]/g);
if (docNames) {
  docNames.forEach(d => {
    const n = d.match(/{ name: ['\"]([^'\"]+)['\"]/)[1];
    strings.add(n);
  });
}

const steps = content.match(/title:\s*['\"]([^'\"]+)['\"],\s*description:\s*['\"]([^'\"]+)['\"]/g);
if (steps) {
  steps.forEach(s => {
    const match = s.match(/title:\s*['\"]([^'\"]+)['\"],\s*description:\s*['\"]([^'\"]+)['\"]/);
    if (match) {
        strings.add(match[1]);
        strings.add(match[2]);
    }
  });
}

const reqs = content.match(/prerequisites:\s*\[([\s\S]*?)\]/g);
if (reqs) {
  reqs.forEach(r => {
    const listMatch = r.match(/\[([\s\S]*?)\]/);
    if(listMatch){
        listMatch[1].split(',').forEach(item => {
            const clean = item.trim().replace(/^['\"]|['\"]$/g, '');
            if(clean && !clean.includes('//')) strings.add(clean);
        });
    }
  });
}

const eligs = content.match(/eligibility:\s*\[([\s\S]*?)\]/g);
if (eligs) {
  eligs.forEach(r => {
    const listMatch = r.match(/\[([\s\S]*?)\]/);
    if(listMatch){
        listMatch[1].split(',').forEach(item => {
            const clean = item.trim().replace(/^['\"]|['\"]$/g, '');
            if(clean && !clean.includes('//')) strings.add(clean);
        });
    }
  });
}

strings.add('Variable');
strings.add('Calculated based on vehicle type and state rules');
strings.add('Approx. 20 minutes online');
strings.add('Approx. 15 minutes online');
strings.add('Depends on vehicle class');
strings.add('Approx. 15 minutes');
strings.add('As per challan');
strings.add('5 minutes');
strings.add('Applicable fee will be calculated by the official backend.');

// Additional UI strings
const uiStrings = [
  'All Services',
  'Browse our complete catalogue of official transport and driving licence services.',
  'Search services...',
  'No services found',
  'Try adjusting your search terms.',
  'Live',
  'Beta',
  'View Details',
  'Working Prototype',
  'Back to all services',
  'Experience Preview',
  'See how this service would work in the redesigned Parivahan experience. Backend integration will eventually connect this workflow to the official government system.',
  'Start Service',
  'Explore Service',
  'Before you start',
  'Estimated Time',
  'Fee Information',
  'RTO Visit Requirement',
  'Online',
  'May Require Visit',
  'RTO Visit Required',
  'Service Availability',
  'Important Prerequisites',
  'Eligibility Criteria',
  'Documents Checklist',
  'Required Documents',
  'Conditional Documents',
  'Optional Documents',
  'Expected Process Timeline',
  'Ready to proceed?',
  'Ensure you have all the required documents scanned and ready before beginning the official application process.',
  'This service is currently in the Experience Preview phase. Explore how the workflow is designed to operate.'
];
uiStrings.forEach(s => strings.add(s));

const transPath = './lib/translations.ts';
let transContent = fs.readFileSync(transPath, 'utf8');

const matchBlock = transContent.match(/const translations[^=]*=\s*(\{[\s\S]*?\});\s*export function/);
if (!matchBlock) {
  console.log('Match failed');
  process.exit(1);
}
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
console.log('Added ' + added + ' keys to translations.ts');
