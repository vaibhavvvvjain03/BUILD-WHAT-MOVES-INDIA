export type Lang = "en" | "hi" | "bn" | "te" | "mr" | "ta" | "ur" | "gu" | "kn" | "ml" | "or" | "pa";

export const LANGUAGE_NAMES: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
  bn: "বাংলা",
  te: "తెలుగు",
  mr: "मराठी",
  ta: "தமிழ்",
  ur: "اردو",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  or: "ଓଡ଼ିଆ",
  pa: "ਪੰਜਾਬੀ",
};

const translations: Record<string, { en: string; hi: string } & Partial<Record<Lang, string>>> = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav_home: {
    en: "Home", hi: "होम", bn: "হোম", te: "హోమ్", mr: "मुख्यपृष्ठ", ta: "முகப்பு", 
    ur: "ہوم", gu: "હોમ", kn: "ಮುಖಪುಟ", ml: "ഹോം", or: "ହୋମ୍", pa: "ਮੁੱਖ ਪੰਨਾ"
  },
  nav_services: {
    en: "Services", hi: "सेवाएँ", bn: "পরিষেবা", te: "సేవలు", mr: "सेवा", ta: "சேவைகள்",
    ur: "خدمات", gu: "સેવાઓ", kn: "ಸೇವೆಗಳು", ml: "സേവനങ്ങൾ", or: "ସେବାଗୁଡିକ", pa: "ਸੇਵਾਵਾਂ"
  },
  nav_applications: {
    en: "My Applications", hi: "मेरे आवेदन", bn: "আমার আবেদন", te: "నా దరఖాస్తులు", mr: "माझे अर्ज", ta: "என் விண்ணப்பங்கள்",
    ur: "میری درخواستیں", gu: "મારી અરજીઓ", kn: "ನನ್ನ ಅರ್ಜಿಗಳು", ml: "എന്റെ അപേക്ഷകൾ", or: "ମୋର ଆବେଦନଗୁଡ଼ିକ", pa: "ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ"
  },
  nav_help: {
    en: "Help", hi: "सहायता", bn: "সাহায্য", te: "సహాయం", mr: "मदत", ta: "உதவி",
    ur: "مدد", gu: "મદદ", kn: "ಸಹಾಯ", ml: "സഹായം", or: "ସାହାଯ୍ୟ", pa: "ਮਦਦ"
  },
  nav_about: {
    en: "About", hi: "के बारे में", bn: "আমাদের সম্পর্কে", te: "గురించి", mr: "आमच्याबद्दल", ta: "பற்றி",
    ur: "ہمارے بارے میں", gu: "અમારા વિશે", kn: "ಬಗ್ಗೆ", ml: "കുറിച്ച്", or: "ବିଷୟରେ", pa: "ਸਾਡੇ ਬਾਰੇ"
  },
  nav_login: {
    en: "Login", hi: "लॉग इन", bn: "লগইন", te: "లాగిన్", mr: "लॉगिन", ta: "உள்நுழை",
    ur: "لاگ ان", gu: "લૉગિન", kn: "ಲಾಗಿನ್", ml: "ലോഗിൻ", or: "ଲଗଇନ୍", pa: "ਲਾਗਇਨ"
  },
  nav_lang_toggle: {
    en: "Language", hi: "भाषा", bn: "ভাষা", te: "భాష", mr: "भाषा", ta: "மொழி",
    ur: "زبان", gu: "ભાષા", kn: "ಭಾಷೆ", ml: "ഭാഷ", or: "ଭାଷା", pa: "ਭਾਸ਼ਾ"
  },
  nav_my_parivahan: { en: "My Parivahan", hi: "मेरा परिवहन" },
  nav_track_application: { en: "Track Application", hi: "आवेदन ट्रैक करें" },

  // ── Hero Section ─────────────────────────────────────────────────────────
  hero_renew: {
    en: "Renew your", hi: "अपना नवीनीकरण करें", bn: "আপনার পুনর্নবীকরণ করুন", te: "మీ పునరుద్ధరించండి", mr: "तुमचे नूतनीकरण करा", ta: "உங்கள் புதுப்பிக்கவும்",
    ur: "اپنی تجدید کریں", gu: "તમારું નવીકરણ કરો", kn: "ನಿಮ್ಮ ನವೀಕರಿಸಿ", ml: "നിങ്ങളുടെ പുതുക്കുക", or: "ଆପଣଙ୍କର ନବୀକରଣ କରନ୍ତୁ", pa: "ਆਪਣਾ ਨਵਿਆਓ"
  },
  hero_line2: {
    en: "in minutes, not visits.", hi: "मिनटों में, दौरे नहीं।", bn: "মিনিটের মধ্যে, ভিজিট নয়।", te: "నిమిషాల్లో, సందర్శనలు కాదు.", mr: "मिनिटांत, फेऱ्या नाही.", ta: "நிமிடங்களில், வருகைகள் அல்ல.",
    ur: "منٹوں میں، دورے نہیں۔", gu: "મિનિટોમાં, મુલાકાતો નહીં.", kn: "ನಿಮಿಷಗಳಲ್ಲಿ, ಭೇಟಿಗಳಲ್ಲ.", ml: "മിനിറ്റുകൾക്കുള്ളിൽ, സന്ദർശനങ്ങളല്ല.", or: "ମିନିଟ୍ ମଧ୍ୟରେ, ପରିଦର୍ଶନ ନୁହେଁ।", pa: "ਮਿੰਟਾਂ ਵਿੱਚ, ਫੇਰੀਆਂ ਨਹੀਂ।"
  },
  hero_subtitle: {
    en: "A faster, simpler, and entirely digital process to renew your driving licence, track your application, and manage all your vehicle services from anywhere.",
    hi: "अपना वाहन चालक लाइसेंस नवीनीकृत करने, आवेदन ट्रैक करने और सभी वाहन सेवाओं को कहीं से भी प्रबंधित करने के लिए एक तेज़, सरल और पूरी तरह से डिजिटल प्रक्रिया।",
    bn: "আপনার ড্রাইভিং লাইসেন্স পুনর্নবীকরণ করতে, আবেদন ট্র্যাক করতে এবং যেকোনো জায়গা থেকে আপনার সমস্ত গাড়ির পরিষেবা পরিচালনা করতে একটি দ্রুত, সহজ এবং সম্পূর্ণ ডিজিটাল প্রক্রিয়া।",
    te: "మీ డ్రైవింగ్ లైసెన్స్‌ను పునరుద్ధరించడానికి, అప్లికేషన్‌ను ట్రాక్ చేయడానికి మరియు మీ అన్ని వాహన సేవలను ఎక్కడి నుండైనా నిర్వహించడానికి వేగవంతమైన, సులభమైన మరియు పూర్తిగా డిజిటల్ ప్రక్రియ.",
    mr: "तुमचा ड्रायव्हिंग परवाना नूतनीकरण करण्यासाठी, अर्ज ट्रॅक करण्यासाठी आणि तुमच्या सर्व वाहन सेवा कुठूनही व्यवस्थापित करण्यासाठी एक जलद, सोपी आणि पूर्णपणे डिजिटल प्रक्रिया.",
    ta: "உங்கள் ஓட்டுநர் உரிமத்தை புதுப்பிக்க, விண்ணப்பத்தை கண்காணிக்க, மற்றும் அனைத்து வாகன சேவைகளையும் எங்கிருந்தும் நிர்வகிக்க வேகமான, எளிமையான, மற்றும் முழு டிஜிட்டல் செயல்முறை.",
    ur: "اپنے ڈرائیونگ لائسنس کی تجدید، درخواست کو ٹریک کرنے اور کہیں سے بھی اپنی تمام گاڑیوں کی خدمات کا انتظام کرنے کا ایک تیز، آسان، اور مکمل ڈیجیٹل عمل۔",
    gu: "તમારું ડ્રાઇવિંગ લાઇસન્સ રિન્યૂ કરવા, એપ્લિકેશન ટ્રૅક કરવા અને ગમે ત્યાંથી તમારી બધી વાહન સેવાઓ મેનેજ કરવા માટે વધુ ઝડપી, સરળ અને સંપૂર્ણ ડિજિટલ પ્રક્રિયા.",
    kn: "ನಿಮ್ಮ ಚಾಲನಾ ಪರವಾನಗಿಯನ್ನು ನವೀಕರಿಸಲು, ಅರ್ಜಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಮತ್ತು ಎಲ್ಲಿಂದಲಾದರೂ ನಿಮ್ಮ ಎಲ್ಲಾ ವಾಹನ ಸೇವೆಗಳನ್ನು ನಿರ್ವಹಿಸಲು ವೇಗವಾದ, ಸರಳ ಮತ್ತು ಸಂಪೂರ್ಣ ಡಿಜಿಟಲ್ ಪ್ರಕ್ರಿಯೆ.",
    ml: "നിങ്ങളുടെ ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കുന്നതിനും ആപ്ലിക്കേഷൻ ട്രാക്ക് ചെയ്യുന്നതിനും എവിടെനിന്നും നിങ്ങളുടെ എല്ലാ വാഹന സേവനങ്ങളും നിയന്ത്രിക്കുന്നതിനുമുള്ള വേഗതയേറിയതും ലളിതവും പൂർണ്ണമായും ഡിജിറ്റലായതുമായ പ്രക്രിയ.",
    or: "ଆପଣଙ୍କର ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ ନବୀକରଣ କରିବା, ଆବେଦନ ଟ୍ରାକ୍ କରିବା ଏବଂ ଯେକୌଣସି ସ୍ଥାନରୁ ଆପଣଙ୍କର ସମସ୍ତ ଯାନ ସେବା ପରିଚାଳନା କରିବା ପାଇଁ ଏକ ଦ୍ରୁତ, ସରଳ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ଡିଜିଟାଲ୍ ପ୍ରକ୍ରିୟା |",
    pa: "ਆਪਣੇ ਡਰਾਈਵਿੰਗ ਲਾਇਸੰਸ ਨੂੰ ਨਵਿਆਉਣ, ਅਰਜ਼ੀ ਨੂੰ ਟਰੈਕ ਕਰਨ, ਅਤੇ ਕਿਤੇ ਵੀ ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਵਾਹਨ ਸੇਵਾਵਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਨ ਲਈ ਇੱਕ ਤੇਜ਼, ਸਰਲ, ਅਤੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਡਿਜੀਟਲ ਪ੍ਰਕਿਰਿਆ।"
  },
  hero_cta: {
    en: "Start DL Renewal", hi: "DL नवीनीकरण शुरू करें", bn: "DL পুনর্নবীকরণ শুরু করুন", te: "DL పునరుద్ధరణ ప్రారంభించండి", mr: "DL नूतनीकरण सुरू करा", ta: "DL புதுப்பித்தலை தொடங்கு",
    ur: "DL تجدید شروع کریں", gu: "DL નવીકરણ શરૂ કરો", kn: "DL ನವೀಕರಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ", ml: "DL പുതുക്കൽ ആരംഭിക്കുക", or: "DL ନବୀକରଣ ଆରମ୍ଭ କରନ୍ତୁ", pa: "DL ਨਵਿਆਉਣ ਸ਼ੁਰੂ ਕਰੋ"
  },

  // ── Rotating words ────────────────────────────────────────────────────────
  word_licence: {
    en: "driving licence", hi: "ड्राइविंग लाइसेंस", bn: "ড্রাইভিং লাইসেন্স", te: "డ్రైవింగ్ లైసెన్స్", mr: "ड्रायव्हिंग परवाना", ta: "ஓட்டுநர் உரிமம்",
    ur: "ڈرائیونگ لائسنس", gu: "ડ્રાઇવિંગ લાઇસન્સ", kn: "ಚಾಲನಾ ಪರವಾನಗಿ", ml: "ഡ്രൈവിംഗ് ലൈസൻസ്", or: "ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ", pa: "ਡਰਾਈਵਿੰਗ ਲਾਇਸੰਸ"
  },
  word_rc: {
    en: "vehicle RC", hi: "वाहन RC", bn: "গাড়ির RC", te: "వాహన RC", mr: "वाहन RC", ta: "வாகன RC",
    ur: "گاڑی کی RC", gu: "વાહન RC", kn: "ವಾಹನ RC", ml: "വാഹന RC", or: "ଯାନ RC", pa: "ਵਾਹਨ RC"
  },
  word_permit: {
    en: "permit", hi: "परमिट", bn: "পারমিট", te: "పర్మిట్", mr: "परमिट", ta: "அனுமதி",
    ur: "پرمٹ", gu: "પરમિટ", kn: "ಪರವಾನಗಿ", ml: "പെർമിറ്റ്", or: "ପରମିଟ୍", pa: "ਪਰਮਿਟ"
  },
  word_tax: {
    en: "road tax", hi: "रोड टैक्स", bn: "রোড ট্যাক্স", te: "రోడ్ టాక్స్", mr: "रोड टॅक्स", ta: "சாலை வரி",
    ur: "روڈ ٹیکس", gu: "રોડ ટેક્સ", kn: "ರಸ್ತೆ ತೆರಿಗೆ", ml: "റോഡ് നികുതി", or: "ରୋଡ୍ ଟ୍ୟାକ୍ସ", pa: "ਸੜਕ ਟੈਕਸ"
  },

  // ── Intent Section ────────────────────────────────────────────────────────
  intent_heading: {
    en: "What do you need today?", hi: "आज आपको क्या चाहिए?", bn: "আজ আপনার কি প্রয়োজন?", te: "ఈ రోజు మీకు ఏమి కావాలి?", mr: "आज तुम्हाला काय हवे आहे?", ta: "இன்று உங்களுக்கு என்ன தேவை?",
    ur: "آج آپ کو کیا چاہیے؟", gu: "આજે તમને શું જોઈએ છે?", kn: "ಇಂದು ನಿಮಗೆ ಏನು ಬೇಕು?", ml: "ഇന്ന് നിങ്ങൾക്ക് എന്ത് വേണം?", or: "ଆଜି ଆପଣଙ୍କର କ'ଣ ଦରକାର?", pa: "ਅੱਜ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?"
  },
  intent_renew: {
    en: "Renew Licence", hi: "लाइसेंस नवीनीकरण", bn: "লাইসেন্স পুনর্নবীকরণ", te: "లైసెన్స్ పునరుద్ధరణ", mr: "परवाना नूतनीकरण", ta: "உரிமம் புதுப்பித்தல்",
    ur: "لائسنس کی تجدید", gu: "લાઇસન્સ નવીકરણ", kn: "ಪರವಾನಗಿ ನವೀಕರಣ", ml: "ലൈസൻസ് പുതുക്കൽ", or: "ଲାଇସେନ୍ସ ନବୀକରଣ", pa: "ਲਾਇਸੰਸ ਨਵਿਆਉਣ"
  },
  intent_transfer: {
    en: "Transfer Vehicle", hi: "वाहन हस्तांतरण", bn: "যানবাহন স্থানান্তর", te: "వాహన బదిలీ", mr: "वाहन हस्तांतरण", ta: "வாகன மாற்றம்",
    ur: "گاڑی کی منتقلی", gu: "વાહન ટ્રાન્સફર", kn: "ವಾಹನ ವರ್ಗಾವಣೆ", ml: "വാഹനം കൈമാറ്റം", or: "ଯାନ ସ୍ଥାନାନ୍ତର", pa: "ਵਾਹਨ ਤਬਾਦਲਾ"
  },
  intent_challan: {
    en: "Pay Challan", hi: "चालान भुगतान", bn: "চালান প্রদান করুন", te: "చలాన్ చెల్లించండి", mr: "चलन भरा", ta: "செலான் செலுத்துக",
    ur: "چالان ادا کریں", gu: "ચલણ ચૂકવો", kn: "ಚಲನ್ ಪಾವತಿಸಿ", ml: "ചലാൻ അടയ്ക്കുക", or: "ଚାଲାଣ ଦିଅନ୍ତୁ", pa: "ਚਲਾਨ ਭੁਗਤਾਨ"
  },
  intent_track: {
    en: "Track Application", hi: "आवेदन ट्रैक करें", bn: "আবেদন ট্র্যাক করুন", te: "అప్లికేషన్ ట్రాక్ చేయండి", mr: "अर्ज ट्रॅक करा", ta: "விண்ணப்பத்தை கண்காணிக்கவும்",
    ur: "درخواست کو ٹریک کریں", gu: "એપ્લિકેશન ટ્રૅક કરો", kn: "ಅರ್ಜಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", ml: "അപേക്ഷ ട്രാക്ക് ചെയ്യുക", or: "ଆବେଦନ ଟ୍ରାକ୍ କରନ୍ତୁ", pa: "ਅਰਜ਼ੀ ਟਰੈਕ ਕਰੋ"
  },
  intent_document: {
    en: "Get Document", hi: "दस्तावेज़ प्राप्त करें", bn: "নথি পান", te: "పత్రం పొందండి", mr: "दस्तऐवज मिळवा", ta: "ஆவணத்தைப் பெறுக",
    ur: "دستاویز حاصل کریں", gu: "દસ્તાવેજ મેળવો", kn: "ದಾಖಲೆ ಪಡೆಯಿರಿ", ml: "രേഖ നേടുക", or: "ଡକ୍ୟୁମେଣ୍ଟ୍ ପାଆନ୍ତୁ", pa: "ਦਸਤਾਵੇਜ਼ ਪ੍ਰਾਪਤ ਕਰੋ"
  },
  intent_unsure: {
    en: "I'm not sure", hi: "मुझे पता नहीं", bn: "আমি নিশ্চিত নই", te: "నాకు ఖచ్చితంగా తెలియదు", mr: "मला नक्की माहित नाही", ta: "எனக்கு உறுதியாக தெரியவில்லை",
    ur: "مجھے یقین نہیں ہے", gu: "મને ખાતરી નથી", kn: "ನನಗೆ ಖಚಿತವಿಲ್ಲ", ml: "എനിക്ക് ഉറപ്പില്ല", or: "ମୁଁ ନିଶ୍ଚିତ ନୁହେଁ", pa: "ਮੈਨੂੰ ਯਕੀਨ ਨਹੀਂ ਹੈ"
  },

  // ── Popular Tasks ─────────────────────────────────────────────────────────
  popular_heading: {
    en: "Popular Tasks", hi: "लोकप्रिय कार्य", bn: "জনপ্রিয় কাজ", te: "జనాదరణ పొందిన పనులు", mr: "लोकप्रिय कामे", ta: "பிரபலமான பணிகள்",
    ur: "مقبول کام", gu: "લોકપ્રિય કાર્યો", kn: "ಜನಪ್ರಿಯ ಕಾರ್ಯಗಳು", ml: "ജനപ്രിയ ജോലികൾ", or: "ଲୋକପ୍ରିୟ କାର୍ଯ୍ୟ", pa: "ਪ੍ਰਸਿੱਧ ਕੰਮ"
  },
  pop_renew: { en: "Renew Driving Licence", hi: "ड्राइविंग लाइसेंस नवीनीकृत करें" },
  pop_challan: { en: "Pay eChallan", hi: "ई-चालान का भुगतान करें" },
  pop_track: { en: "Track Application", hi: "आवेदन ट्रैक करें" },
  pop_transfer: { en: "Transfer Vehicle", hi: "वाहन स्थानांतरित करें" },
  pop_rc: { en: "Duplicate RC", hi: "डुप्लिकेट RC" },
  pop_address: { en: "Change Address", hi: "पता बदलें" },
  pop_search_all: { en: "Search all services", hi: "सभी सेवाएँ खोजें" },
  intent_subtext: { en: "Choose your goal and we'll take you straight there.", hi: "अपना लक्ष्य चुनें और हम आपको सीधे वहां ले जाएंगे।" },

  // ── Before You Start ─────────────────────────────────────────────────────
  bys_heading: {
    en: "Renew Your Driving Licence", hi: "अपना ड्राइविंग लाइसेंस नवीनीकृत करें", bn: "আপনার ড্রাইভিং লাইসেন্স পুনর্নবীকরণ করুন", te: "మీ డ్రైవింగ్ లైసెన్స్‌ను పునరుద్ధరించండి", mr: "तुमचा ड्रायव्हिंग परवाना नूतनीकरण करा", ta: "உங்கள் ஓட்டுநர் உரிமத்தை புதுப்பிக்கவும்",
    ur: "اپنے ڈرائیونگ لائسنس کی تجدید کریں", gu: "તમારું ડ્રાઇવિંગ લાઇસન્સ રિન્યૂ કરો", kn: "ನಿಮ್ಮ ಚಾಲನಾ ಪರವಾನಗಿಯನ್ನು ನವೀಕರಿಸಿ", ml: "നിങ്ങളുടെ ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കുക", or: "ଆପଣଙ୍କର ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ ନବୀକରଣ କରନ୍ତୁ", pa: "ਆਪਣਾ ਡਰਾਈਵਿੰਗ ਲਾਇਸੰਸ ਨਵਿਆਓ"
  },
  bys_subtitle: {
    en: "Before you start, here's what you need to know", hi: "शुरू करने से पहले, यहाँ आपको क्या जानना चाहिए", bn: "শুরু করার আগে, আপনার যা জানা দরকার তা এখানে", te: "మీరు ప్రారంభించడానికి ముందు, మీరు తెలుసుకోవలసినది ఇక్కడ ఉంది", mr: "सुरू करण्यापूर्वी, तुम्हाला काय माहित असणे आवश्यक आहे ते येथे आहे", ta: "நீங்கள் தொடங்குவதற்கு முன், நீங்கள் தெரிந்து கொள்ள வேண்டியது இங்கே",
    ur: "شروع کرنے سے پہلے، آپ کو یہ جاننے کی ضرورت ہے۔", gu: "તમે શરૂ કરો તે પહેલાં, તમારે આ જાણવાની જરૂર છે", kn: "ನೀವು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು, ನೀವು ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದದ್ದು ಇಲ್ಲಿದೆ", ml: "നിങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്, നിങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട കാര്യങ്ങൾ ഇതാ", or: "ଆପଣ ଆରମ୍ଭ କରିବା ପୂର୍ବରୁ, ଏଠାରେ ଆପଣ ଜାଣିବା ଆବଶ୍ୟକ କରୁଥିବା ବିଷୟ ଅଛି |", pa: "ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਹਾਨੂੰ ਇਹ ਜਾਣਨ ਦੀ ਲੋੜ ਹੈ"
  },
  bys_time: {
    en: "Approx. 10–15 minutes online", hi: "ऑनलाइन लगभग 10-15 मिनट", bn: "অনলাইনে প্রায় 10-15 মিনিট", te: "ఆన్‌లైన్‌లో సుమారు 10-15 నిమిషాలు", mr: "ऑनलाइन सुमारे 10-15 मिनिटे", ta: "ஆன்லைனில் சுமார் 10-15 நிமிடங்கள்",
    ur: "آن لائن تقریبا 10-15 منٹ", gu: "ઓનલાઈન લગભગ 10-15 મિનિટ", kn: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸುಮಾರು 10-15 ನಿಮಿಷಗಳು", ml: "ഓൺലൈനിൽ ഏകദേശം 10-15 മിനിറ്റ്", or: "ଅନଲାଇନରେ ପ୍ରାୟ 10-15 ମିନିଟ୍ |", pa: "ਆਨਲਾਈਨ ਲਗਭਗ 10-15 ਮਿੰਟ"
  },
  bys_fee: {
    en: "₹200 renewal fee", hi: "₹200 नवीनीकरण शुल्क", bn: "₹200 পুনর্নবীকরণ ফি", te: "₹200 పునరుద్ధరణ రుసుము", mr: "₹200 नूतनीकरण शुल्क", ta: "₹200 புதுப்பித்தல் கட்டணம்",
    ur: "₹200 تجدید فیس", gu: "₹200 નવીકરણ ફી", kn: "₹200 ನವೀಕರಣ ಶುಲ್ಕ", ml: "₹200 പുതുക്കൽ ഫീസ്", or: "₹200 ନବୀକରଣ ଫି", pa: "₹200 ਨਵਿਆਉਣ ਦੀ ਫੀਸ"
  },
  bys_rto: {
    en: "No RTO visit required for most cases", hi: "अधिकतर मामलों में RTO यात्रा की आवश्यकता नहीं", bn: "বেশিরভাগ ক্ষেত্রে কোনো RTO ভিজিটের প্রয়োজন নেই", te: "చాలా కేసులకు RTO సందర్శన అవసరం లేదు", mr: "बहुतेक प्रकरणांमध्ये RTO भेटीची आवश्यकता नाही", ta: "பெரும்பாலான நிகழ்வுகளுக்கு RTO வருகை தேவையில்லை",
    ur: "زیادہ تر معاملات میں RTO کے دورے کی ضرورت نہیں ہے۔", gu: "મોટાભાગના કિસ્સાઓમાં RTO ની મુલાકાત જરૂરી નથી", kn: "ಹೆಚ್ಚಿನ ಪ್ರಕರಣಗಳಿಗೆ RTO ಭೇಟಿ ಅಗತ್ಯವಿಲ್ಲ", ml: "മിക്ക കേസുകൾക്കും RTO സന്ദർശനം ആവശ്യമില്ല", or: "ଅଧିକାଂଶ କ୍ଷେତ୍ରରେ କୌଣସି RTO ପରିଦର୍ଶନ ଆବଶ୍ୟକ ନାହିଁ |", pa: "ਜ਼ਿਆਦਾਤਰ ਮਾਮਲਿਆਂ ਵਿੱਚ RTO ਫੇਰੀ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ"
  },
  bys_docs_heading: {
    en: "Documents required:", hi: "आवश्यक दस्तावेज़:", bn: "প্রয়োজনীয় নথি:", te: "కావాల్సిన పత్రాలు:", mr: "आवश्यक कागदपत्रे:", ta: "தேவையான ஆவணங்கள்:",
    ur: "درکار دستاویزات:", gu: "જરૂરી દસ્તાવેજો:", kn: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:", ml: "ആവശ്യമായ രേഖകൾ:", or: "ଆବଶ୍ୟକ ଦଲିଲଗୁଡ଼ିକ:", pa: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼:"
  },
  bys_doc1: {
    en: "Existing Driving Licence", hi: "मौजूदा ड्राइविंग लाइसेंस", bn: "বিদ্যমান ড্রাইভিং লাইসেন্স", te: "ఇప్పటికే ఉన్న డ్రైవింగ్ లైసెన్స్", mr: "विद्यमान ड्रायव्हिंग परवाना", ta: "தற்போதுள்ள ஓட்டுநர் உரிமம்",
    ur: "موجودہ ڈرائیونگ لائسنس", gu: "હાલનું ડ્રાઇવિંગ લાઇસન્સ", kn: "ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಚಾಲನಾ ಪರವಾನಗಿ", ml: "നിലവിലുള്ള ഡ്രൈവിംഗ് ലൈസൻസ്", or: "ବର୍ତ୍ତମାନର ଡ୍ରାଇଭିଂ ଲାଇସେନ୍ସ |", pa: "ਮੌਜੂਦਾ ਡਰਾਈਵਿੰਗ ਲਾਇਸੰਸ"
  },
  bys_doc2: {
    en: "Address Proof", hi: "पते का प्रमाण", bn: "ঠিকানার প্রমাণ", te: "చిరునామా రుజువు", mr: "पत्ता पुरावा", ta: "முகவரி சான்று",
    ur: "پتہ کا ثبوت", gu: "સરનામાનો પુરાવો", kn: "ವಿಳಾಸ ಪುರಾವೆ", ml: "വിലാസ തെളിവ്", or: "ଠିକଣା ପ୍ରମାଣ", pa: "ਪਤੇ ਦਾ ਸਬੂਤ"
  },
  bys_doc3: {
    en: "Passport-size photograph", hi: "पासपोर्ट आकार की फ़ोटो", bn: "পাসপোর্ট সাইজের ছবি", te: "పాస్‌పోర్ట్ సైజు ఫోటో", mr: "पासपोर्ट आकाराचा फोटो", ta: "பாஸ்போர்ட் அளவு புகைப்படம்",
    ur: "پاسپورٹ سائز تصویر", gu: "પાસપોર્ટ સાઇઝનો ફોટો", kn: "ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ", ml: "പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ", or: "ପାସପୋର୍ଟ ଆକାରର ଫଟୋଗ୍ରାଫ୍ |", pa: "ਪਾਸਪੋਰਟ ਆਕਾਰ ਦੀ ਫੋਟੋ"
  },
  bys_doc4: {
    en: "Form 1A (Medical Certificate) — if applicable", hi: "फॉर्म 1A (चिकित्सा प्रमाणपत्र) — यदि लागू हो", bn: "ফর্ম 1A (মেডিকেল সার্টিফিকেট) — যদি প্রযোজ্য হয়", te: "ఫారం 1A (మెడికల్ సర్టిఫికేట్) — వర్తిస్తే", mr: "फॉर्म 1A (वैद्यकीय प्रमाणपत्र) — लागू असल्यास", ta: "படிவம் 1A (மருத்துவச் சான்றிதழ்) — பொருந்தினால்",
    ur: "فارم 1A (طبی سرٹیفکیٹ) — اگر قابل اطلاق ہو۔", gu: "ફોર્મ 1A (મેડિકલ સર્ટિફિકેટ) — જો લાગુ હોય તો", kn: "ಫಾರ್ಮ್ 1A (ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ) — ಅನ್ವಯಿಸಿದರೆ", ml: "ഫോം 1A (മെഡിക്കൽ സർട്ടിഫിക്കറ്റ്) — ബാധകമെങ്കിൽ", or: "ଫର୍ମ 1A (ଡାକ୍ତରୀ ପ୍ରମାଣପତ୍ର) - ଯଦି ପ୍ରଯୁଜ୍ୟ |", pa: "ਫਾਰਮ 1A (ਮੈਡੀਕਲ ਸਰਟੀਫਿਕੇਟ) — ਜੇਕਰ ਲਾਗੂ ਹੋਵੇ"
  },
  bys_steps_heading: {
    en: "Steps in this flow:", hi: "इस प्रक्रिया में चरण:", bn: "এই প্রবাহের ধাপগুলি:", te: "ఈ ప్రవాహంలో దశలు:", mr: "या प्रक्रियेतील चरण:", ta: "இந்த ஓட்டத்தில் உள்ள படிகள்:",
    ur: "اس عمل کے مراحل:", gu: "આ પ્રવાહમાં પગલાં:", kn: "ಈ ಹರಿವಿನಲ್ಲಿ ಹಂತಗಳು:", ml: "ഈ പ്രവാഹത്തിലെ ഘട്ടങ്ങൾ:", or: "ଏହି ପ୍ରବାହରେ ପଦକ୍ଷେପଗୁଡିକ:", pa: "ਇਸ ਪ੍ਰਵਾਹ ਵਿੱਚ ਕਦਮ:"
  },
  bys_step1: {
    en: "Select State", hi: "राज्य चुनें", bn: "রাজ্য নির্বাচন করুন", te: "రాష్ట్రాన్ని ఎంచుకోండి", mr: "राज्य निवडा", ta: "மாநிலத்தைத் தேர்ந்தெடு",
    ur: "ریاست منتخب کریں", gu: "રાજ્ય પસંદ કરો", kn: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ", ml: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക", or: "ରାଜ୍ୟ ବାଛନ୍ତୁ |", pa: "ਰਾਜ ਚੁਣੋ"
  },
  bys_step2: {
    en: "Verify Identity", hi: "पहचान सत्यापित करें", bn: "পরিচয় যাচাই করুন", te: "గుర్తింపును ధృవీకరించండి", mr: "ओळख तपासा", ta: "அடையாளத்தை சரிபார்க்கவும்",
    ur: "شناخت کی تصدیق کریں", gu: "ઓળખ ચકાસો", kn: "ಗುರುತನ್ನು ಪರಿಶೀಲಿಸಿ", ml: "ഐഡൻ്റിറ്റി പരിശോധിച്ചുറപ്പിക്കുക", or: "ପରିଚୟ ଯାଞ୍ଚ କରନ୍ତୁ |", pa: "ਪਛਾਣ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ"
  },
  bys_step3: {
    en: "Review Details", hi: "विवरण की समीक्षा करें", bn: "বিবরণ পর্যালোচনা করুন", te: "వివరాలను సమీక్షించండి", mr: "तपशीलांचे पुनरावलोकन करा", ta: "விவரங்களை மதிப்பாய்வு செய்யவும்",
    ur: "تفصیلات کا جائزہ لیں", gu: "વિગતોની સમીક્ષા કરો", kn: "ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ", ml: "വിശദാംശങ്ങൾ അവലോകനം ചെയ്യുക", or: "ବିବରଣୀ ସମୀକ୍ଷା କରନ୍ତୁ |", pa: "ਵੇਰਵਿਆਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ"
  },
  bys_step4: {
    en: "Upload Documents", hi: "दस्तावेज़ अपलोड करें", bn: "নথি আপলোড করুন", te: "పత్రాలను అప్‌లోడ్ చేయండి", mr: "कागदपत्रे अपलोड करा", ta: "ஆவணங்களை பதிவேற்றவும்",
    ur: "دستاویزات اپ لوڈ کریں", gu: "દસ્તાવેજો અપલોડ કરો", kn: "ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", ml: "രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക", or: "ଡକ୍ୟୁମେଣ୍ଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ |", pa: "ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ"
  },
  bys_step5: {
    en: "Payment", hi: "भुगतान", bn: "পেমেন্ট", te: "చెల్లింపు", mr: "पेमेंट", ta: "கட்டணம்",
    ur: "ادائیگی", gu: "ચુકવણી", kn: "ಪಾವತಿ", ml: "പേയ്മെൻ്റ്", or: "ପେମେଣ୍ଟ", pa: "ਭੁਗਤਾਨ"
  },
  bys_step6: {
    en: "Confirmation", hi: "पुष्टि", bn: "নিশ্চিতকরণ", te: "నిర్ధారణ", mr: "पुष्टीकरण", ta: "உறுதிப்படுத்தல்",
    ur: "تصدیق", gu: "પુષ્ટિ", kn: "ದೃಢೀಕರಣ", ml: "സ്ഥിരീകരണം", or: "ନିଶ୍ଚିତକରଣ", pa: "ਪੁਸ਼ਟੀਕਰਨ"
  },
  step_start: { en: "Start", hi: "शुरू" },
  step_state: { en: "State", hi: "राज्य" },
  step_link_dl: { en: "Link DL", hi: "DL लिंक" },
  step_review: { en: "Review", hi: "समीक्षा" },
  step_documents: { en: "Docs", hi: "दस्तावेज़" },
  step_payment: { en: "Payment", hi: "भुगतान" },
  step_track: { en: "Track", hi: "ट्रैक" },
  
  // ── DL Renewal Page Header ──────────────────────────────────────────────
  dl_online_services: { en: "Online Services", hi: "ऑनलाइन सेवाएँ" },
  dl_renewal_title: { en: "Driving Licence Renewal", hi: "ड्राइविंग लाइसेंस नवीनीकरण" },
  dl_renewal_subtitle: { en: "Renew your DL online in a few simple steps.", hi: "कुछ सरल चरणों में अपना DL ऑनलाइन नवीनीकृत करें।" },

  // ── State Selection ───────────────────────────────────────────────────────
  state_select_title: { en: "Select your State / UT", hi: "अपना राज्य / केंद्र शासित प्रदेश चुनें" },
  state_select_subtitle: { en: "Services are managed by your state RTO", hi: "सेवाओं का प्रबंधन आपके राज्य RTO द्वारा किया जाता है" },
  state_label: { en: "State / Union Territory", hi: "राज्य / केंद्र शासित प्रदेश" },
  state_placeholder: { en: "— Select your state —", hi: "— अपना राज्य चुनें —" },
  state_unavailable_title: { en: "Currently available for select states", hi: "वर्तमान में चुनिंदा राज्यों के लिए उपलब्ध है" },
  state_unavailable_desc1: { en: " is not yet onboarded. We are rolling out across all states — more coming soon.", hi: " अभी तक ऑनबोर्ड नहीं किया गया है। हम सभी राज्यों में विस्तार कर रहे हैं — जल्द ही और आ रहे हैं।" },
  state_continue: { en: "Continue to DL Renewal", hi: "DL नवीनीकरण के लिए आगे बढ़ें" },

  // ── Verify / Link DL ──────────────────────────────────────────────────────
  verify_title: { en: "Link your Driving Licence", hi: "अपना ड्राइविंग लाइसेंस लिंक करें" },
  verify_subtitle: { en: "Enter your DL details to fetch your current record.", hi: "अपना वर्तमान रिकॉर्ड प्राप्त करने के लिए अपना DL विवरण दर्ज करें।" },
  dl_number_label: { en: "Driving Licence Number", hi: "ड्राइविंग लाइसेंस नंबर" },
  dl_number_placeholder: { en: "e.g., MH01 2011 0012345", hi: "उदा., MH01 2011 0012345" },
  dob_label: { en: "Date of Birth", hi: "जन्म तिथि" },
  captcha_label: { en: "Security CAPTCHA", hi: "सुरक्षा कैप्चा" },
  captcha_placeholder: { en: "Enter the 6 characters shown above", hi: "ऊपर दिखाए गए 6 अक्षर दर्ज करें" },
  fetch_details: { en: "Fetch Details", hi: "विवरण प्राप्त करें" },
  fetching: { en: "Fetching...", hi: "प्राप्त कर रहा है..." },

  // ── Review ────────────────────────────────────────────────────────────────
  review_title: { en: "Review your Details", hi: "अपने विवरण की समीक्षा करें" },
  review_subtitle: { en: "Verify the information fetched from Parivahan Sewa before proceeding.", hi: "आगे बढ़ने से पहले परिवहन सेवा से प्राप्त जानकारी की पुष्टि करें।" },
  review_personal: { en: "Personal Details", hi: "व्यक्तिगत विवरण" },
  review_licence: { en: "Licence Details", hi: "लाइसेंस विवरण" },
  review_address: { en: "Registered Address", hi: "पंजीकृत पता" },
  review_proceed: { en: "Confirm & Proceed to Documents", hi: "पुष्टि करें और दस्तावेज़ों पर जाएँ" },

  // ── Documents ─────────────────────────────────────────────────────────────
  docs_title: { en: "Upload Documents", hi: "दस्तावेज़ अपलोड करें" },
  docs_subtitle: { en: "Upload clear, readable copies of the required documents.", hi: "आवश्यक दस्तावेज़ों की स्पष्ट, पठनीय प्रतियां अपलोड करें।" },
  docs_upload_btn: { en: "Upload", hi: "अपलोड करें" },
  docs_uploaded: { en: "Uploaded", hi: "अपलोड किया गया" },
  docs_proceed: { en: "Proceed to Payment", hi: "भुगतान के लिए आगे बढ़ें" },
  
  // ── Payment ───────────────────────────────────────────────────────────────
  pay_title: { en: "Fee Payment", hi: "शुल्क भुगतान" },
  pay_subtitle: { en: "Pay the required fees to complete your application.", hi: "अपना आवेदन पूरा करने के लिए आवश्यक शुल्क का भुगतान करें।" },
  pay_amount_label: { en: "Total Amount Due", hi: "कुल देय राशि" },
  pay_btn: { en: "Pay Securely", hi: "सुरक्षित रूप से भुगतान करें" },
  processing: { en: "Processing...", hi: "प्रोसेस हो रहा है..." },

  bys_cta: {
    en: "I'm Ready — Start", hi: "मैं तैयार हूँ — शुरू करें", bn: "আমি প্রস্তুত — শুরু করুন", te: "నేను సిద్ధంగా ఉన్నాను — ప్రారంభించండి", mr: "मी तयार आहे — सुरू करा", ta: "நான் தயார் — தொடங்கு",
    ur: "میں تیار ہوں — شروع کریں", gu: "હું તૈયાર છું — શરૂ કરો", kn: "ನಾನು ಸಿದ್ಧನಿದ್ದೇನೆ — ಪ್ರಾರಂಭಿಸಿ", ml: "ഞാൻ തയ്യാറാണ് — ആരംഭിക്കുക", or: "ମୁଁ ପ୍ରସ୍ତୁତ - ଆରମ୍ଭ କର |", pa: "ਮੈਂ ਤਿਆਰ ਹਾਂ — ਸ਼ੁਰੂ ਕਰੋ"
  },


  action_req: { en: "Action Required", hi: "कार्रवाई आवश्यक" },
  approved: { en: "Approved", hi: "स्वीकृत" },
  in_progress: { en: "In Progress", hi: "प्रगति पर है" },
  renew_dl: { en: "Renew DL", hi: "DL नवीनीकृत करें" },
  transfer_rc: { en: "Transfer RC", hi: "RC स्थानांतरित करें" },
  pay_challan_btn: { en: "Pay Challan", hi: "चालान भुगतान" },
  view_all: { en: "View All", hi: "सभी देखें" },
  profile_title: { en: "Profile", hi: "प्रोफ़ाइल" },
  prof_name: { en: "Name", hi: "नाम" },
  prof_dob: { en: "Date of Birth", hi: "जन्म तिथि" },
  prof_mobile: { en: "Mobile", hi: "मोबाइल" },
  prof_address: { en: "Address", hi: "पता" },

  dl_card: { en: "Driving Licence", hi: "ड्राइविंग लाइसेंस" },
  status_active: { en: "Active", hi: "सक्रिय" },

  // ── Help Page ────────────────────────────────────────────────────────────
  help_title: { en: "How can we help you?", hi: "हम आपकी कैसे मदद कर सकते हैं?" },
  search_placeholder: { en: "Search for guides, FAQs, or support...", hi: "गाइड, अक्सर पूछे जाने वाले प्रश्न, या समर्थन खोजें..." },
  popular: { en: "Popular:", hi: "लोकप्रिय:" },
  help_dl_process: { en: "DL Renewal Process", hi: "DL नवीनीकरण प्रक्रिया" },
  help_pay_challan: { en: "Pay Challan", hi: "चालान भुगतान" },
  help_find_app: { en: "Find Application Number", hi: "आवेदन संख्या खोजें" },
  citizen_guides: { en: "Citizen Guides", hi: "नागरिक गाइड" },
  citizen_guides_desc: { en: "Step-by-step tutorials for using online services.", hi: "ऑनलाइन सेवाओं का उपयोग करने के लिए चरण-दर-चरण ट्यूटोरियल।" },
  dl_forms: { en: "Download Forms", hi: "फॉर्म डाउनलोड करें" },
  dl_forms_desc: { en: "Access all official RTO forms (Form 1, 1A, 29, 30 etc.)", hi: "सभी आधिकारिक RTO फॉर्म (फॉर्म 1, 1A, 29, 30 आदि) तक पहुंचें" },
  video_tutorials: { en: "Video Tutorials", hi: "वीडियो ट्यूटोरियल" },
  video_tutorials_desc: { en: "Watch visual guides on how to complete applications.", hi: "आवेदन पूरा करने के तरीके पर दृश्य गाइड देखें।" },
  contact_support: { en: "Contact Support", hi: "समर्थन से संपर्क करें" },
  contact_support_desc: { en: "Reach out to our helpdesk or find your local RTO.", hi: "हमारे हेल्पडेस्क तक पहुंचें या अपना स्थानीय RTO खोजें।" },
  faqs_title: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" },
  view_all_faqs: { en: "View all FAQs", hi: "सभी अक्सर पूछे जाने वाले प्रश्न देखें" },
  faq1_q: { en: "How do I renew my Driving Licence online?", hi: "मैं अपना ड्राइविंग लाइसेंस ऑनलाइन कैसे नवीनीकृत करूँ?" },
  faq1_a: { en: "You can renew your Driving Licence online through the Parivahan Sewa portal up to 1 year before expiry or 1 year after expiry. Go to Services > Driving Licence > Renew Driving Licence to start the process.", hi: "आप समाप्ति से 1 वर्ष पहले या समाप्ति के 1 वर्ष बाद तक परिवहन सेवा पोर्टल के माध्यम से अपना ड्राइविंग लाइसेंस ऑनलाइन नवीनीकृत कर सकते हैं। प्रक्रिया शुरू करने के लिए सेवाएं > ड्राइविंग लाइसेंस > ड्राइविंग लाइसेंस नवीनीकृत करें पर जाएं।" },
  faq2_q: { en: "What is Form 1A and when do I need it?", hi: "फॉर्म 1A क्या है और मुझे इसकी आवश्यकता कब होगी?" },
  faq2_a: { en: "Form 1A is a Medical Certificate. It is required for all Transport Vehicle drivers, and for Non-Transport Vehicle drivers who are above the age of 40 applying for renewal.", hi: "फॉर्म 1A एक चिकित्सा प्रमाणपत्र है। यह सभी परिवहन वाहन चालकों और 40 वर्ष से अधिक आयु के गैर-परिवहन वाहन चालकों के लिए नवीनीकरण के लिए आवेदन करते समय आवश्यक है।" },
  faq3_q: { en: "How can I pay my traffic e-challan?", hi: "मैं अपने ट्रैफिक ई-चालान का भुगतान कैसे कर सकता हूँ?" },
  faq3_a: { en: "Navigate to the 'Pay Challan' service. Enter your challan number, vehicle number, or DL number. You can review the violation and pay securely online.", hi: "'चालान भुगतान' सेवा पर जाएं। अपना चालान नंबर, वाहन नंबर, या DL नंबर दर्ज करें। आप उल्लंघन की समीक्षा कर सकते हैं और सुरक्षित रूप से ऑनलाइन भुगतान कर सकते हैं।" },
  faq4_q: { en: "Do I need to visit the RTO after online application?", hi: "क्या मुझे ऑनलाइन आवेदन के बाद RTO जाने की आवश्यकता है?" },
  faq4_a: { en: "Many services like DL Renewal (for ages <40) are completely faceless and do not require an RTO visit. However, for services requiring biometric capture or physical vehicle inspection, an RTO visit is mandatory. This will be clearly stated before you apply.", hi: "DL नवीनीकरण (40 वर्ष से कम आयु के लिए) जैसी कई सेवाएं पूरी तरह से फेसलेस हैं और RTO यात्रा की आवश्यकता नहीं है। हालांकि, बायोमेट्रिक कैप्चर या भौतिक वाहन निरीक्षण की आवश्यकता वाली सेवाओं के लिए, RTO यात्रा अनिवार्य है। आवेदन करने से पहले यह स्पष्ट रूप से बताया जाएगा।" },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer_title: { en: "Parivahan Sewa", hi: "परिवहन सेवा" },
  footer_subtitle: { en: "The official digital portal for all vehicle and driving licence related services across India.", hi: "पूरे भारत में सभी वाहन और ड्राइविंग लाइसेंस संबंधी सेवाओं के लिए आधिकारिक डिजिटल पोर्टल।" },
  footer_morth: { en: "Ministry of Road Transport & Highways", hi: "सड़क परिवहन और राजमार्ग मंत्रालय" },
  footer_goi: { en: "Government of India", hi: "भारत सरकार" },
  footer_services: { en: "Services", hi: "सेवाएं" },
  footer_srv_dl: { en: "Driving Licence", hi: "ड्राइविंग लाइसेंस" },
  footer_srv_rc: { en: "Vehicle & RC", hi: "वाहन और आरसी" },
  footer_srv_tax: { en: "Tax & Payments", hi: "कर और भुगतान" },
  footer_srv_permits: { en: "Permits", hi: "परमिट" },
  footer_srv_appt: { en: "Appointments", hi: "नियुक्तियां" },
  footer_support: { en: "Support", hi: "समर्थन" },
  footer_sup_help: { en: "Help Centre", hi: "सहायता केंद्र" },
  footer_sup_faq: { en: "FAQs", hi: "अक्सर पूछे जाने वाले प्रश्न" },
  footer_sup_guide: { en: "Citizen Guide", hi: "नागरिक गाइड" },
  footer_sup_track: { en: "Track Application", hi: "आवेदन ट्रैक करें" },
  footer_sup_raise: { en: "Raise a Concern", hi: "चिंता व्यक्त करें" },
  footer_sup_contact: { en: "Contact", hi: "संपर्क करें" },
  footer_resources: { en: "Resources", hi: "संसाधन" },
  footer_res_forms: { en: "Forms", hi: "फॉर्म" },
  footer_res_fees: { en: "Fees", hi: "शुल्क" },
  footer_res_acts: { en: "Acts & Rules", hi: "अधिनियम और नियम" },
  footer_res_notifications: { en: "Notifications & Advisories", hi: "सूचनाएं और सलाह" },
  footer_portals: { en: "Other Portals", hi: "अन्य पोर्टल" },
  footer_por_mparivahan: { en: "mParivahan", hi: "एम-परिवहन" },
  footer_por_echallan: { en: "eChallan", hi: "ई-चालान" },
  footer_por_pucc: { en: "PUCC", hi: "पीयूसीसी" },
  footer_por_fancy: { en: "Fancy Number", hi: "फैंसी नंबर" },
  footer_por_national: { en: "National Permit", hi: "राष्ट्रीय परमिट" },
  footer_por_vahan: { en: "Vahan Green Sewa", hi: "वाहन ग्रीन सेवा" },
  footer_professional: { en: "Professional", hi: "पेशेवर" },
  footer_pro_dealer: { en: "Dealer Services", hi: "डीलर सेवाएं" },
  footer_pro_mfg: { en: "Manufacturer Services", hi: "निर्माता सेवाएं" },
  footer_pro_dash: { en: "Dashboards & Reports", hi: "डैशबोर्ड और रिपोर्ट" },
  footer_legal: { en: "Legal", hi: "कानूनी" },
  footer_leg_privacy: { en: "Privacy", hi: "गोपनीयता" },
  footer_leg_terms: { en: "Terms", hi: "शर्तें" },
  footer_leg_access: { en: "Accessibility", hi: "पहुंच-योग्यता" },
  footer_leg_policies: { en: "Website Policies", hi: "वेबसाइट नीतियां" },
  
  // ── Disclaimer ───────────────────────────────────────────────────────────
  disclaimer_text: {
    en: "This is an independent redesign prototype of Parivahan Sewa — not the official government platform. Backend, payments, and OTP are simulated with mock data for demonstration. AI features (VANI) are experimental and may not always respond perfectly.",
    hi: "यह परिवहन सेवा का एक स्वतंत्र पुन: डिज़ाइन प्रोटोटाइप है — आधिकारिक सरकारी मंच नहीं। बैकएंड, भुगतान और ओटीपी प्रदर्शन के लिए मॉक डेटा के साथ सिम्युलेट किए गए हैं। एआई सुविधाएं (VANI) प्रायोगिक हैं और हो सकता है कि हमेशा सही प्रतिक्रिया न दें।"
  },
  // ── Track Application ──────────────────────────────────────────────────────
  track_back_home: { en: "Back to Home", hi: "होम पर वापस जाएँ" },
  track_title: { en: "Track Application", hi: "आवेदन ट्रैक करें" },
  track_subtitle: { en: "Enter your application details below to check the real-time status of your request.", hi: "अपने अनुरोध की रीयल-टाइम स्थिति की जांच करने के लिए नीचे अपने आवेदन का विवरण दर्ज करें।" },
  track_app_no: { en: "Application Number *", hi: "आवेदन संख्या *" },
  track_app_no_placeholder: { en: "e.g. PSW-2026-123456", hi: "उदा. PSW-2026-123456" },
  track_public_note: { en: "Note: This is the public tracking portal.", hi: "नोट: यह सार्वजनिक ट्रैकिंग पोर्टल है।" },
  track_dob_opt: { en: "Date of Birth (Optional)", hi: "जन्म तिथि (वैकल्पिक)" },
  track_btn: { en: "Track Status", hi: "स्थिति ट्रैक करें" },
  track_searching: { en: "Searching...", hi: "खोज रहा है..." },
  track_not_found: { en: "Application Not Found", hi: "आवेदन नहीं मिला" },
  track_not_found_desc: { en: "We couldn't find an application with the number", hi: "हमें इस नंबर वाला कोई आवेदन नहीं मिला" },
  track_check_num: { en: "Please check the number and try again.", hi: "कृपया नंबर जांचें और पुनः प्रयास करें।" },
  track_need_help: { en: "Need help?", hi: "मदद चाहिए?" },
  track_lost_num: { en: "If you have lost your application number, you can retrieve it using your registered mobile number and date of birth.", hi: "यदि आपने अपना आवेदन नंबर खो दिया है, तो आप अपने पंजीकृत मोबाइल नंबर और जन्म तिथि का उपयोग करके इसे पुनर्प्राप्त कर सकते हैं।" },
  track_retrieve: { en: "Retrieve Application Number", hi: "आवेदन संख्या पुनर्प्राप्त करें" },

  // ── About Page ─────────────────────────────────────────────────────────────
  about_title: { en: "About Parivahan Sewa", hi: "परिवहन सेवा के बारे में" },
  about_subtitle: { en: "A redesigned citizen experience layer built for the Build What Moves India initiative.", hi: "बिल्ड व्हाट मूव्स इंडिया पहल के लिए बनाया गया एक नया नागरिक अनुभव स्तर।" },
  about_initiative_title: { en: "The Initiative", hi: "पहल" },
  about_initiative_desc: { en: "This platform is a completely redesigned citizen experience layer built for the Build What Moves India hackathon. Our primary focus is on making the Driving Licence Renewal journey simpler, faster, and more accessible for everyone.", hi: "यह प्लेटफ़ॉर्म बिल्ड व्हाट मूव्स इंडिया हैकाथॉन के लिए बनाया गया एक पूरी तरह से नया नागरिक अनुभव स्तर है। हमारा प्राथमिक फोकस ड्राइविंग लाइसेंस नवीनीकरण यात्रा को सभी के लिए सरल, तेज और अधिक सुलभ बनाने पर है।" },
  about_live_preview_title: { en: "What's Live vs. In Preview", hi: "क्या लाइव है बनाम क्या प्रीव्यू में है" },
  about_fully_functional: { en: "Fully Functional", hi: "पूरी तरह कार्यात्मक" },
  about_fully_functional_desc: { en: "The Driving Licence Renewal flow is fully functional and interactive, powered by mock backend logic. You can experience the complete end-to-end process as it is intended to work.", hi: "ड्राइविंग लाइसेंस नवीनीकरण प्रवाह पूरी तरह से कार्यात्मक और इंटरैक्टिव है, जो मॉक बैकएंड लॉजिक द्वारा संचालित है। आप संपूर्ण एंड-टू-एंड प्रक्रिया का अनुभव कर सकते हैं जैसा कि यह काम करने के लिए अभिप्रेत है।" },
  about_try_dl_renewal: { en: "Try DL Renewal", hi: "डीएल नवीनीकरण का प्रयास करें" },
  about_experience_previews: { en: "Experience Previews", hi: "अनुभव प्रीव्यू" },
  about_experience_previews_desc: { en: "Other services shown across the site are Experience Previews. While their interfaces may be visible, they are static demonstrations intended to showcase the intended workflow and design system.", hi: "साइट पर दिखाई गई अन्य सेवाएँ अनुभव प्रीव्यू हैं। हालांकि उनके इंटरफेस दिखाई दे सकते हैं, वे स्थैतिक प्रदर्शन हैं जिनका उद्देश्य इच्छित वर्कफ़्लो और डिज़ाइन सिस्टम को दिखाना है।" },
  about_browse_services: { en: "Browse Services", hi: "सेवाएं ब्राउज़ करें" },

  // ── Dashboard (My Parivahan) ───────────────────────────────────────────────
  welcome: { en: "Welcome", hi: "स्वागत है" },
  aadhaar_verified: { en: "Aadhaar Verified", hi: "आधार सत्यापित" },
  no_dl_linked: { en: "No Driving Licence Linked", hi: "कोई ड्राइविंग लाइसेंस लिंक नहीं है" },
  no_dl_msg: { en: "Link your driving licence to access digital documents and faster renewals.", hi: "डिजिटल दस्तावेज़ों तक पहुँचने और तेज़ी से नवीनीकरण करने के लिए अपना ड्राइविंग लाइसेंस लिंक करें।" },
  link_dl_btn: { en: "Link Driving Licence", hi: "ड्राइविंग लाइसेंस लिंक करें" },
  applications_title: { en: "Applications", hi: "आवेदन" },
  track_other: { en: "Track other application", hi: "अन्य आवेदन ट्रैक करें" },
  no_apps: { en: "No applications yet", hi: "अभी तक कोई आवेदन नहीं" },
  no_apps_msg_1: { en: "Start a new application to see it here.", hi: "इसे यहां देखने के लिए एक नया आवेदन शुरू करें।" },
  no_apps_msg_2: { en: "Link your DL or start an application.", hi: "अपना DL लिंक करें या एक आवेदन शुरू करें।" },
  digital_docs: { en: "Digital Documents", hi: "डिजिटल दस्तावेज़" },
  rc_number: { en: "RC Number:", hi: "RC नंबर:" },
  view_doc: { en: "View", hi: "देखें" },
  add_rc: { en: "Add Vehicle (RC)", hi: "वाहन जोड़ें (RC)" },
  recent_activity: { en: "Recent Activity", hi: "हाल की गतिविधि" },
  no_activity: { en: "No recent activity.", hi: "कोई हाल की गतिविधि नहीं।" },
  login_prompt: { en: "Please log in to view your dashboard.", hi: "कृपया अपना डैशबोर्ड देखने के लिए लॉग इन करें।" },
  login_btn: { en: "Log in", hi: "लॉग इन करें" },
  login_signin: { en: "Sign In Required", hi: "साइन इन आवश्यक" },
  login_req_msg: { en: "Please log in to access your dashboard, track applications, and manage digital documents.", hi: "अपना डैशबोर्ड देखने, आवेदन ट्रैक करने और डिजिटल दस्तावेज़ प्रबंधित करने के लिए कृपया लॉग इन करें।" },
  signin_btn: { en: "Sign In with Mobile or Aadhaar", hi: "मोबाइल या आधार से साइन इन करें" },
  start_new_app: { en: "Start New Application", hi: "नया आवेदन शुरू करें" },

  // ── Finder (Navbar Modal) ────────────────────────────────────────────────
  finder_title: { en: "Describe what you need ✨", hi: "बताएं आपको क्या चाहिए ✨" },
  finder_browse: { en: "Browse & Search", hi: "ब्राउज़ करें और खोजें" },
  finder_search_placeholder: { en: "Search by service name or category...", hi: "सेवा के नाम या श्रेणी से खोजें..." },
  finder_ai_placeholder: { en: "e.g. 'I lost my license and need a new one' or 'How to pay traffic fine?'", hi: "उदा. 'मेरा लाइसेंस खो गया है और मुझे नया चाहिए' या 'ट्रैफ़िक जुर्माना कैसे भरें?'" },
  finder_suggest_1: { en: "I want to renew my driving licence", hi: "मैं अपना ड्राइविंग लाइसेंस नवीनीकृत करना चाहता हूँ" },
  finder_suggest_2: { en: "I sold my car, how to transfer ownership?", hi: "मैंने अपनी कार बेच दी है, स्वामित्व कैसे स्थानांतरित करूं?" },
  finder_suggest_3: { en: "Where can I pay my traffic challan?", hi: "मैं अपना ट्रैफिक चालान कहां भर सकता हूं?" },

  // ── Why it's easier ────────────────────────────────────────────────────────
  why_easier_1_title: { en: "No more RTO visits", hi: "RTO जाने की आवश्यकता नहीं" },
  why_easier_1_desc: { en: "Skip the long queues. Complete your application entirely online and upload documents securely from your home.", hi: "लंबी कतारों से बचें। अपना आवेदन पूरी तरह से ऑनलाइन पूरा करें और घर बैठे सुरक्षित रूप से दस्तावेज़ अपलोड करें।" },
  why_easier_2_title: { en: "Clear instructions", hi: "स्पष्ट निर्देश" },
  why_easier_2_desc: { en: "We guide you step-by-step. Know exactly which forms to fill and which documents are required before you start.", hi: "हम आपका चरण-दर-चरण मार्गदर्शन करते हैं। शुरू करने से पहले ठीक से जान लें कि कौन से फॉर्म भरने हैं और किन दस्तावेजों की आवश्यकता है।" },
  why_easier_3_title: { en: "Transparent tracking", hi: "पारदर्शी ट्रैकिंग" },
  why_easier_3_desc: { en: "Track your application status in real-time. Receive instant notifications via SMS when your licence is approved.", hi: "अपने आवेदन की स्थिति को वास्तविक समय में ट्रैक करें। आपका लाइसेंस स्वीकृत होने पर SMS के माध्यम से तत्काल सूचनाएं प्राप्त करें।" },

  // ── Portal Overhaul Additions ─────────────────────────────────────────────
  
  // Hero Rotating Words
  hero_word_0: { en: "driving licence", hi: "ड्राइविंग लाइसेंस" },
  hero_word_1: { en: "vehicle services", hi: "वाहन सेवाएं" },
  hero_word_2: { en: "challan", hi: "चालान" },
  hero_word_3: { en: "application", hi: "आवेदन" },
  hero_word_4: { en: "right Parivahan service", hi: "सही परिवहन सेवा" },

  // Hero Actions (Renew your / Manage your etc.)
  hero_action_0: { en: "Renew your", hi: "अपना नवीनीकरण करें" },
  hero_action_1: { en: "Manage your", hi: "प्रबंधित करें" },
  hero_action_2: { en: "Check your", hi: "अपना चेक करें" },
  hero_action_3: { en: "Track your", hi: "अपना ट्रैक करें" },
  hero_action_4: { en: "Find the", hi: "खोजें" },

  // Hero Descriptions
  hero_desc_0: { en: "Complete your licence renewal journey with clear requirements and step-by-step guidance.", hi: "स्पष्ट आवश्यकताओं और चरण-दर-चरण मार्गदर्शन के साथ अपनी लाइसेंस नवीनीकरण यात्रा पूरी करें。" },
  hero_desc_1: { en: "Transfer ownership, update details, access RC services and more from one place.", hi: "स्वामित्व हस्तांतरित करें, विवरण अपडेट करें, RC सेवाओं तक पहुंचें और बहुत कुछ एक ही स्थान से。" },
  hero_desc_2: { en: "View challans, payment status and related traffic-service information.", hi: "चालान, भुगतान की स्थिति और संबंधित यातायात-सेवा की जानकारी देखें。" },
  hero_desc_3: { en: "See exactly where your application stands and what you need to do next.", hi: "देखें कि आपका आवेदन वास्तव में कहां है और आपको आगे क्या करना है。" },
  hero_desc_4: { en: "Tell us what you need and we'll guide you to the right service.", hi: "हमें बताएं कि आपको क्या चाहिए और हम आपको सही सेवा के लिए मार्गदर्शन करेंगे。" },

  // Hero CTAs
  hero_cta_0: { en: "Start DL Renewal", hi: "DL नवीनीकरण शुरू करें" },
  hero_cta_1: { en: "Explore Vehicle Services", hi: "वाहन सेवाओं का अन्वेषण करें" },
  hero_cta_2: { en: "Check Challan", hi: "चालान जांचें" },
  hero_cta_3: { en: "Track Application", hi: "आवेदन ट्रैक करें" },
  hero_cta_4: { en: "Find a Service", hi: "सेवा खोजें" },

  // Explore Services Section
  explore_services_title: { en: "Explore all Parivahan services", hi: "सभी परिवहन सेवाओं का अन्वेषण करें" },
  explore_services_desc: { en: "Find driving licence, vehicle, tax, permit, appointment and application services in one place.", hi: "एक ही स्थान पर ड्राइविंग लाइसेंस, वाहन, कर, परमिट, नियुक्ति और आवेदन सेवाएं खोजें。" },
  explore_services_cta: { en: "Explore all services", hi: "सभी सेवाओं का अन्वेषण करें" },

  // My Parivahan Vehicles
  my_vehicles_title: { en: "My Vehicles", hi: "मेरे वाहन" },
  vehicle_rc_status: { en: "RC Status", hi: "RC स्थिति" },
  vehicle_tax: { en: "Tax", hi: "कर" },
  vehicle_pucc: { en: "PUCC", hi: "PUCC" },
  vehicle_valid: { en: "Valid", hi: "वैध" },
  vehicle_view: { en: "View vehicle", hi: "वाहन देखें" },
  vehicle_detail_title: { en: "Vehicle Details", hi: "वाहन विवरण" },
  vehicle_reg_no: { en: "Registration number", hi: "पंजीकरण संख्या" },
  vehicle_type: { en: "Vehicle type", hi: "वाहन का प्रकार" },
  vehicle_services: { en: "Vehicle Services", hi: "वाहन सेवाएं" },
  vehicle_related_apps: { en: "Related Applications", hi: "संबंधित आवेदन" },
};

export function t(lang: Lang | undefined, key: string): string {
  if (!lang || !translations[key]) return key;
  return translations[key][lang] || translations[key]["en"] || key;
}

export const ALL_TRANSLATION_KEYS = Object.keys(translations);
