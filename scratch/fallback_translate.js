const fs = require('fs');

async function main() {
  const transPath = 'lib/translations.ts';
  let content = fs.readFileSync(transPath, 'utf8');

  const matchBlock = content.match(/const translations[^=]*=\s*(\{[\s\S]*?\});\s*export function/);
  if (!matchBlock) return;
  
  const objStr = matchBlock[1];
  let translations;
  try {
    translations = new Function('return ' + objStr)();
  } catch (e) {
    console.error('Syntax error in translations object', e);
    return;
  }

  const langs = ['hi', 'mr', 'bn', 'gu', 'ta', 'te', 'kn', 'ml', 'pa', 'or', 'ur'];
  
  for (const [key, langsObj] of Object.entries(translations)) {
    const textToTranslate = langsObj['en'] || key;
    
    for (const lang of langs) {
      if (!langsObj[lang]) {
        // Fallback for missing
        langsObj[lang] = textToTranslate;
      }
    }
  }

  let newObjStr = "{\n";
  for (const [k, v] of Object.entries(translations)) {
    const valStr = Object.entries(v).map(([langKey, langVal]) => `${langKey}: ${JSON.stringify(langVal)}`).join(', ');
    newObjStr += `  ${JSON.stringify(k)}: { ${valStr} },\n`;
  }
  newObjStr += "}";

  fs.writeFileSync(transPath, content.replace(matchBlock[1], newObjStr), 'utf8');
  console.log('Translations updated with fallbacks!');
}

main().catch(console.error);
