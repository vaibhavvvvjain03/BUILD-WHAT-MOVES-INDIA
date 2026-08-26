const fs = require('fs');

async function translateText(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch (e) {
    console.error(`Error translating to ${targetLang}:`, e.message);
    return null;
  }
}

async function main() {
  const transPath = 'lib/translations.ts';
  let content = fs.readFileSync(transPath, 'utf8');

  // Parse the object (naive way won't work well if there are functions, but we can regex out the object)
  const matchBlock = content.match(/const translations[^=]*=\s*(\{[\s\S]*?\});\s*export function/);
  if (!matchBlock) return;
  
  // Safe evaluation using new Function
  const objStr = matchBlock[1];
  let translations;
  try {
    translations = new Function('return ' + objStr)();
  } catch (e) {
    console.error('Syntax error in translations object', e);
    return;
  }

  const langs = ['hi', 'mr', 'bn', 'gu', 'ta', 'te', 'kn', 'ml', 'pa', 'or'];
  
  let updatedStr = matchBlock[1];
  
  for (const [key, langsObj] of Object.entries(translations)) {
    const textToTranslate = langsObj['en'] || key;
    
    for (const lang of langs) {
      if (!langsObj[lang] || langsObj[lang] === textToTranslate) {
        console.log(`Translating: "${key}" to ${lang}...`);
        const translated = await translateText(textToTranslate, lang);
        if (translated) {
           // We need to inject this into the string. We'll do a regex replace for this specific key
           // Find where this key starts
           // It's tricky to manipulate the JS object and serialize it back preserving order and formatting
           // So we'll just update the JS object, and then write it back as JSON-like string, but TS has no quotes around keys sometimes
           langsObj[lang] = translated;
        }
        // sleep a bit to avoid rate limits
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }

  // To write back, we can stringify and format
  let newObjStr = "{\n";
  for (const [k, v] of Object.entries(translations)) {
    const valStr = Object.entries(v).map(([langKey, langVal]) => `${langKey}: ${JSON.stringify(langVal)}`).join(', ');
    newObjStr += `  ${JSON.stringify(k)}: { ${valStr} },\n`;
  }
  newObjStr += "}";

  fs.writeFileSync(transPath, content.replace(matchBlock[1], newObjStr), 'utf8');
  console.log('Translations updated!');
}

main().catch(console.error);
