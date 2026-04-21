const testid = localStorage.getItem("testid");

const question = document.querySelector("#ques");
const options = document.querySelectorAll(".option");
const clearbtn = document.querySelector("#clearbt");
const submitbtn = document.querySelector("#subbt");


const section = document.querySelector(".sec");

let currentQ = 0;


let selectedAnswer = null;



let status = []; 
let testQuestions = [];
let userAnswers = [];

const questionbank = {

  ssc : [

  // ================= GK (Easy) =================
  { q: "भारत की राजधानी क्या है?", options: ["दिल्ली","मुंबई","कोलकाता","चेन्नई"], answer: "दिल्ली", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय पशु कौन है?", options: ["शेर","बाघ","हाथी","घोड़ा"], answer: "बाघ", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय पक्षी कौन है?", options: ["मोर","कबूतर","तोता","हंस"], answer: "मोर", category: "GK", difficulty: "easy" },
  { q: "सूर्य किस दिशा में उगता है?", options: ["पूर्व","पश्चिम","उत्तर","दक्षिण"], answer: "पूर्व", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय फूल कौन सा है?", options: ["गुलाब","कमल","गेंदा","चमेली"], answer: "कमल", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय गान क्या है?", options: ["वंदे मातरम्","जन गण मन","जय हिंद","सारे जहाँ से अच्छा"], answer: "जन गण मन", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय खेल क्या है?", options: ["क्रिकेट","हॉकी","फुटबॉल","कबड्डी"], answer: "हॉकी", category: "GK", difficulty: "easy" },
  { q: "भारत की सबसे लंबी नदी कौन सी है?", options: ["गंगा","यमुना","नर्मदा","गोदावरी"], answer: "गंगा", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय फल कौन सा है?", options: ["सेब","आम","केला","अंगूर"], answer: "आम", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय वृक्ष कौन सा है?", options: ["नीम","बरगद","पीपल","आम"], answer: "बरगद", category: "GK", difficulty: "easy" },

  // ================= Math (Easy) =================
  { q: "5 + 7 = ?", options: ["10","11","12","13"], answer: "12", category: "Math", difficulty: "easy" },
  { q: "10 × 5 = ?", options: ["40","50","60","45"], answer: "50", category: "Math", difficulty: "easy" },
  { q: "20 ÷ 4 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "15 - 6 = ?", options: ["7","8","9","10"], answer: "9", category: "Math", difficulty: "easy" },
  { q: "9 × 3 = ?", options: ["27","21","24","30"], answer: "27", category: "Math", difficulty: "easy" },
  { q: "8 + 6 = ?", options: ["13","14","15","16"], answer: "14", category: "Math", difficulty: "easy" },
  { q: "50 ÷ 10 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "12 × 2 = ?", options: ["20","22","24","26"], answer: "24", category: "Math", difficulty: "easy" },
  { q: "30 - 10 = ?", options: ["10","15","20","25"], answer: "20", category: "Math", difficulty: "easy" },
  { q: "7 + 8 = ?", options: ["14","15","16","17"], answer: "15", category: "Math", difficulty: "easy" },

  // ================= Science (Easy) =================
  { q: "पानी का रासायनिक सूत्र क्या है?", options: ["H2O","CO2","O2","NaCl"], answer: "H2O", category: "Science", difficulty: "easy" },
  { q: "मनुष्य के शरीर में कितने हृदय होते हैं?", options: ["1","2","3","4"], answer: "1", category: "Science", difficulty: "easy" },
  { q: "सूर्य एक क्या है?", options: ["ग्रह","तारा","उपग्रह","धूमकेतु"], answer: "तारा", category: "Science", difficulty: "easy" },
  { q: "पौधे अपना भोजन कैसे बनाते हैं?", options: ["प्रकाश संश्लेषण","श्वसन","पाचन","उत्सर्जन"], answer: "प्रकाश संश्लेषण", category: "Science", difficulty: "easy" },
  { q: "हम किस गैस में सांस लेते हैं?", options: ["ऑक्सीजन","कार्बन डाइऑक्साइड","नाइट्रोजन","हाइड्रोजन"], answer: "ऑक्सीजन", category: "Science", difficulty: "easy" },

  // ================= GK (Medium) =================
  { q: "भारत का सबसे बड़ा राज्य कौन सा है?", options: ["MP","UP","राजस्थान","महाराष्ट्र"], answer: "राजस्थान", category: "GK", difficulty: "medium" },
  { q: "भारत का पहला राष्ट्रपति कौन था?", options: ["नेहरू","गांधी","राजेंद्र प्रसाद","पटेल"], answer: "राजेंद्र प्रसाद", category: "GK", difficulty: "medium" },
  { q: "गंगा नदी का उद्गम कहाँ है?", options: ["गंगोत्री","यमुनोत्री","केदारनाथ","बद्रीनाथ"], answer: "गंगोत्री", category: "GK", difficulty: "medium" },
  { q: "भारत का संविधान कब लागू हुआ?", options: ["1947","1950","1949","1952"], answer: "1950", category: "GK", difficulty: "medium" },
  { q: "विश्व का सबसे बड़ा महाद्वीप कौन सा है?", options: ["अफ्रीका","एशिया","यूरोप","ऑस्ट्रेलिया"], answer: "एशिया", category: "GK", difficulty: "medium" },

  // ================= Math (Medium) =================
  { q: "√144 = ?", options: ["10","11","12","13"], answer: "12", category: "Math", difficulty: "medium" },
  { q: "25 × 4 = ?", options: ["80","90","100","110"], answer: "100", category: "Math", difficulty: "medium" },
  { q: "36 ÷ 6 = ?", options: ["5","6","7","8"], answer: "6", category: "Math", difficulty: "medium" },
  { q: "18 + 25 = ?", options: ["43","44","45","46"], answer: "43", category: "Math", difficulty: "medium" },
  { q: "50 - 23 = ?", options: ["25","26","27","28"], answer: "27", category: "Math", difficulty: "medium" },
 { q: "Work का SI unit क्या है?", options: ["Joule","Watt","Newton","Pascal"], answer: "Joule" },
  { q: "Acceleration का formula क्या है?", options: ["v-u/t","F/m","s/t","None"], answer: "v-u/t" },
  { q: "Gravitational force का formula क्या है?", options: ["Gm1m2/r²","F=ma","E=mc²","None"], answer: "Gm1m2/r²" },
  { q: "Power का SI unit क्या है?", options: ["Watt","Joule","Newton","Volt"], answer: "Watt" },
  { q: "Ohm’s law क्या है?", options: ["V=IR","F=ma","P=VI","None"], answer: "V=IR" },
  { q: "Escape velocity किस पर depend नहीं करती?", options: ["Mass","Radius","Time","Gravity"], answer: "Time" },
  { q: "Capacitance का formula क्या है?", options: ["Q/V","V/I","I/R","None"], answer: "Q/V" },
  { q: "Frequency की unit क्या है?", options: ["Hz","m/s","kg","N"], answer: "Hz" },
 
  // ================= Science (Medium) =================
  { q: "CO2 का पूरा नाम क्या है?", options: ["Carbon Dioxide","Oxygen","Hydrogen","Nitrogen"], answer: "Carbon Dioxide", category: "Science", difficulty: "medium" },
  { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", options: ["206","210","205","200"], answer: "206", category: "Science", difficulty: "medium" },
  { q: "पृथ्वी सूर्य के चारों ओर कितने दिन में घूमती है?", options: ["365","366","360","364"], answer: "365", category: "Science", difficulty: "medium" },
  { q: "बल की SI इकाई क्या है?", options: ["न्यूटन","जूल","वाट","पास्कल"], answer: "न्यूटन", category: "Science", difficulty: "medium" },

  // ================= HARD MIX =================
  { q: "DNA का पूरा नाम क्या है?", options: ["Deoxyribonucleic Acid","RNA","Acid","None"], answer: "Deoxyribonucleic Acid", category: "Science", difficulty: "hard" },
  { q: "यदि x = 5, तो x² + 2x = ?", options: ["25","30","35","20"], answer: "35", category: "Math", difficulty: "hard" },
  { q: "भारत का सबसे लंबा बांध कौन सा है?", options: ["भाखड़ा","हीराकुंड","टिहरी","सरदार सरोवर"], answer: "हीराकुंड", category: "GK", difficulty: "hard" }

],
  railway: [
  {
    q: "रेलवे का full form क्या है?",
    options: ["Rail Work", "Railway System", "Indian Railway", "None"],
    answer: "Indian Railway"
  },
  {
    q: "Train की speed किसमें मापी जाती है?",
    options: ["kg", "km/h", "meter", "litre"],
    answer: "km/h"
  },
   { q: "CO2 का पूरा नाम क्या है?", options: ["Carbon Dioxide","Oxygen","Hydrogen","Nitrogen"], answer: "Carbon Dioxide", category: "Science", difficulty: "medium" },
  { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", options: ["206","210","205","200"], answer: "206", category: "Science", difficulty: "medium" },
  { q: "पृथ्वी सूर्य के चारों ओर कितने दिन में घूमती है?", options: ["365","366","360","364"], answer: "365", category: "Science", difficulty: "medium" },
  { q: "बल की SI इकाई क्या है?", options: ["न्यूटन","जूल","वाट","पास्कल"], answer: "न्यूटन", category: "Science", difficulty: "medium" },

  {
    q: "भारत की पहली ट्रेन कब चली थी?",
    options: ["1853", "1900", "1947", "2000"],
    answer: "1853"
  },
  {
    q: "रेलवे स्टेशन किसके अंतर्गत आता है?",
    options: ["राज्य सरकार", "केंद्र सरकार", "नगर निगम", "पंचायत"],
    answer: "केंद्र सरकार"
  },
   { q: "पानी का रासायनिक सूत्र क्या है?", options: ["H2O","CO2","O2","NaCl"], answer: "H2O" },
  { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", options: ["206","210","200","205"], answer: "206" },
  { q: "CO2 का पूरा नाम क्या है?", options: ["Carbon Dioxide","Oxygen","Hydrogen","Nitrogen"], answer: "Carbon Dioxide" },
  { q: "सूर्य एक क्या है?", options: ["तारा","ग्रह","उपग्रह","धूमकेतु"], answer: "तारा" },
  { q: "हम किस गैस में सांस लेते हैं?", options: ["ऑक्सीजन","नाइट्रोजन","CO2","हाइड्रोजन"], answer: "ऑक्सीजन" },

  // ===== Extra (Mix to reach 100) =====
  { q: "भारत का राष्ट्रीय खेल क्या है?", options: ["हॉकी","क्रिकेट","फुटबॉल","कबड्डी"], answer: "हॉकी" },
  { q: "MP की सबसे बड़ी नदी कौन सी है?", options: ["नर्मदा","ताप्ती","चंबल","बेतवा"], answer: "नर्मदा" },
  { q: "भारत का राष्ट्रीय फूल कौन सा है?", options: ["कमल","गुलाब","चमेली","गेंदा"], answer: "कमल" },
  { q: "25 × 4 = ?", options: ["80","90","100","110"], answer: "100" },
  { q: "√144 = ?", options: ["10","11","12","13"], answer: "12" },
  { q: "DNA का पूरा नाम क्या है?", options: ["Deoxyribonucleic Acid","RNA","Acid","None"], answer: "Deoxyribonucleic Acid" },

  {
    q: "IRCTC क्या है?",
    options: ["Rail Company", "Ticket Booking Service", "Train Engine", "None"],
    answer: "Ticket Booking Service"
  },

  // 🔽 New Added Questions
  {
    q: "भारत की पहली ट्रेन कहाँ से कहाँ तक चली थी?",
    options: ["मुंबई से ठाणे", "दिल्ली से आगरा", "कोलकाता से हावड़ा", "चेन्नई से मदुरै"],
    answer: "मुंबई से ठाणे"
  },
  {
    q: "रेलवे का मुख्यालय कहाँ स्थित है?",
    options: ["मुंबई", "दिल्ली", "कोलकाता", "चेन्नई"],
    answer: "दिल्ली"
  },
  {
    q: "भारत में सबसे तेज ट्रेन कौन सी है?",
    options: ["राजधानी", "शताब्दी", "वंदे भारत", "दुरंतो"],
    answer: "वंदे भारत"
  },
   { q: "5 + 7 = ?", options: ["10","11","12","13"], answer: "12", category: "Math", difficulty: "easy" },
  { q: "10 × 5 = ?", options: ["40","50","60","45"], answer: "50", category: "Math", difficulty: "easy" },
  { q: "20 ÷ 4 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "15 - 6 = ?", options: ["7","8","9","10"], answer: "9", category: "Math", difficulty: "easy" },
  { q: "9 × 3 = ?", options: ["27","21","24","30"], answer: "27", category: "Math", difficulty: "easy" },
  { q: "8 + 6 = ?", options: ["13","14","15","16"], answer: "14", category: "Math", difficulty: "easy" },
  { q: "50 ÷ 10 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "12 × 2 = ?", options: ["20","22","24","26"], answer: "24", category: "Math", difficulty: "easy" },
  { q: "30 - 10 = ?", options: ["10","15","20","25"], answer: "20", category: "Math", difficulty: "easy" },
  
  {
    q: "रेलवे ट्रैक पर कितने प्रकार के गेज होते हैं?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    q: "रेलवे सिग्नल का लाल रंग क्या दर्शाता है?",
    options: ["रुकना", "चलना", "धीरे चलना", "कोई नहीं"],
    answer: "रुकना"
  },
  {
    q: "IRCTC का पूरा नाम क्या है?",
    options: [
      "Indian Railway Catering and Tourism Corporation",
      "Indian Rail Ticket Center",
      "Railway Travel Company",
      "None"
    ],
    answer: "Indian Railway Catering and Tourism Corporation"
  },
  {
    q: "रेल इंजन किससे चलता है?",
    options: ["पेट्रोल", "डीजल/बिजली", "गैस", "कोयला"],
    answer: "डीजल/बिजली"
  },
   { q: "भारत का सबसे बड़ा राज्य कौन सा है?", options: ["MP","UP","राजस्थान","महाराष्ट्र"], answer: "राजस्थान", category: "GK", difficulty: "medium" },
  { q: "भारत का पहला राष्ट्रपति कौन था?", options: ["नेहरू","गांधी","राजेंद्र प्रसाद","पटेल"], answer: "राजेंद्र प्रसाद", category: "GK", difficulty: "medium" },
  { q: "गंगा नदी का उद्गम कहाँ है?", options: ["गंगोत्री","यमुनोत्री","केदारनाथ","बद्रीनाथ"], answer: "गंगोत्री", category: "GK", difficulty: "medium" },
 
  {
    q: "भारत में सबसे लंबा रेलवे प्लेटफॉर्म कहाँ है?",
    options: ["गोरखपुर", "खड़गपुर", "हावड़ा", "दिल्ली"],
    answer: "गोरखपुर"
  },
   { q: "भारत का संविधान कब लागू हुआ?", options: ["1947","1950","1949","1952"], answer: "1950" },
  { q: "भारत का पहला राष्ट्रपति कौन था?", options: ["नेहरू","गांधी","राजेंद्र प्रसाद","पटेल"], answer: "राजेंद्र प्रसाद" },
  { q: "भारत का सबसे बड़ा राज्य कौन सा है?", options: ["MP","UP","राजस्थान","महाराष्ट्र"], answer: "राजस्थान" },
  { q: "भारत की सबसे लंबी नदी कौन सी है?", options: ["गंगा","यमुना","नर्मदा","गोदावरी"], answer: "गंगा" },
  { q: "सूर्य किस दिशा में उगता है?", options: ["पूर्व","पश्चिम","उत्तर","दक्षिण"], answer: "पूर्व" },
  { q: "विश्व का सबसे बड़ा महाद्वीप कौन सा है?", options: ["एशिया","अफ्रीका","यूरोप","ऑस्ट्रेलिया"], answer: "एशिया" },

  {
    q: "रेलवे टिकट बुक करने के लिए कौन सा ऐप उपयोग होता है?",
    options: ["Paytm", "IRCTC Rail Connect", "Google Pay", "PhonePe"],
    answer: "IRCTC Rail Connect"
  },
  {
    q: "रेलवे में TTE का काम क्या होता है?",
    options: ["टिकट चेक करना", "ट्रेन चलाना", "सफाई करना", "खाना देना"],
    answer: "टिकट चेक करना"
  },
  {
    q: "भारत में कुल कितने रेलवे ज़ोन हैं?",
    options: ["10", "12", "18", "20"],
    answer: "18"
  },
  {
    q: "प्लेटफॉर्म टिकट क्यों लिया जाता है?",
    options: ["ट्रेन में बैठने के लिए", "स्टेशन में प्रवेश के लिए", "खाना खरीदने के लिए", "None"],
    answer: "स्टेशन में प्रवेश के लिए"
  }
],

  mppolice: [

  // ===== MP GK =====
  { q: "MP की राजधानी क्या है?", options: ["भोपाल","इंदौर","ग्वालियर","उज्जैन"], answer: "भोपाल" },
  { q: "MP का सबसे बड़ा शहर कौन सा है?", options: ["भोपाल","इंदौर","सागर","रीवा"], answer: "इंदौर" },
  { q: "MP में कितने जिले हैं?", options: ["52","55","50","60"], answer: "52" },
  { q: "MP का उच्च न्यायालय कहाँ है?", options: ["इंदौर","भोपाल","जबलपुर","ग्वालियर"], answer: "जबलपुर" },
  { q: "MP का राज्य पशु क्या है?", options: ["बाघ","शेर","गाय","हिरण"], answer: "बाघ" },
  { q: "MP का राज्य पक्षी क्या है?", options: ["मोर","दूधराज","तोता","कबूतर"], answer: "दूधराज" },
  { q: "MP का राज्य वृक्ष क्या है?", options: ["नीम","बरगद","सागौन","पीपल"], answer: "बरगद" },
  { q: "MP का राज्य फूल क्या है?", options: ["कमल","गुलाब","चमेली","लिली"], answer: "कमल" },
  { q: "MP में सबसे लंबी नदी कौन सी है?", options: ["नर्मदा","ताप्ती","चंबल","बेतवा"], answer: "नर्मदा" },
  { q: "भोपाल किस झील के लिए प्रसिद्ध है?", options: ["ऊपरी झील","डल झील","चिल्का","वुलर"], answer: "ऊपरी झील" },

  // ===== India GK =====
  { q: "भारत की राजधानी क्या है?", options: ["दिल्ली","मुंबई","कोलकाता","चेन्नई"], answer: "दिल्ली" },
  { q: "भारत का राष्ट्रीय पशु कौन है?", options: ["शेर","बाघ","हाथी","घोड़ा"], answer: "बाघ" },
  { q: "भारत का राष्ट्रीय पक्षी कौन है?", options: ["मोर","तोता","कबूतर","हंस"], answer: "मोर" },
  { q: "भारत का राष्ट्रीय गान क्या है?", options: ["जन गण मन","वंदे मातरम्","जय हिंद","सारे जहाँ से अच्छा"], answer: "जन गण मन" },
  { q: "भारत का संविधान कब लागू हुआ?", options: ["1947","1950","1949","1952"], answer: "1950" },
  { q: "भारत का पहला राष्ट्रपति कौन था?", options: ["नेहरू","गांधी","राजेंद्र प्रसाद","पटेल"], answer: "राजेंद्र प्रसाद" },
  { q: "भारत का सबसे बड़ा राज्य कौन सा है?", options: ["MP","UP","राजस्थान","महाराष्ट्र"], answer: "राजस्थान" },
  { q: "भारत की सबसे लंबी नदी कौन सी है?", options: ["गंगा","यमुना","नर्मदा","गोदावरी"], answer: "गंगा" },
  { q: "सूर्य किस दिशा में उगता है?", options: ["पूर्व","पश्चिम","उत्तर","दक्षिण"], answer: "पूर्व" },
  { q: "विश्व का सबसे बड़ा महाद्वीप कौन सा है?", options: ["एशिया","अफ्रीका","यूरोप","ऑस्ट्रेलिया"], answer: "एशिया" },

  // ===== Math =====
  { q: "5 + 7 = ?", options: ["10","11","12","13"], answer: "12" },
  { q: "10 × 5 = ?", options: ["40","50","60","45"], answer: "50" },
  { q: "20 ÷ 4 = ?", options: ["4","5","6","7"], answer: "5" },
  { q: "15 - 6 = ?", options: ["7","8","9","10"], answer: "9" },
  { q: "9 × 3 = ?", options: ["27","21","24","30"], answer: "27" },
  { q: "8 + 6 = ?", options: ["13","14","15","16"], answer: "14" },
  { q: "50 ÷ 10 = ?", options: ["4","5","6","7"], answer: "5" },
  { q: "12 × 2 = ?", options: ["20","22","24","26"], answer: "24" },
  { q: "30 - 10 = ?", options: ["10","15","20","25"], answer: "20" },
  { q: "7 + 8 = ?", options: ["14","15","16","17"], answer: "15" },

  // ===== Science =====
  { q: "पानी का रासायनिक सूत्र क्या है?", options: ["H2O","CO2","O2","NaCl"], answer: "H2O" },
  { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", options: ["206","210","200","205"], answer: "206" },
  { q: "CO2 का पूरा नाम क्या है?", options: ["Carbon Dioxide","Oxygen","Hydrogen","Nitrogen"], answer: "Carbon Dioxide" },
  { q: "सूर्य एक क्या है?", options: ["तारा","ग्रह","उपग्रह","धूमकेतु"], answer: "तारा" },
  { q: "हम किस गैस में सांस लेते हैं?", options: ["ऑक्सीजन","नाइट्रोजन","CO2","हाइड्रोजन"], answer: "ऑक्सीजन" },

  // ===== Extra (Mix to reach 100) =====
  { q: "भारत का राष्ट्रीय खेल क्या है?", options: ["हॉकी","क्रिकेट","फुटबॉल","कबड्डी"], answer: "हॉकी" },
  { q: "MP की सबसे बड़ी नदी कौन सी है?", options: ["नर्मदा","ताप्ती","चंबल","बेतवा"], answer: "नर्मदा" },
  { q: "भारत का राष्ट्रीय फूल कौन सा है?", options: ["कमल","गुलाब","चमेली","गेंदा"], answer: "कमल" },
  { q: "25 × 4 = ?", options: ["80","90","100","110"], answer: "100" },
  { q: "√144 = ?", options: ["10","11","12","13"], answer: "12" },
  { q: "DNA का पूरा नाम क्या है?", options: ["Deoxyribonucleic Acid","RNA","Acid","None"], answer: "Deoxyribonucleic Acid" }

],

  placement: [

  // ===== Basics =====
  { q: "HTML का full form क्या है?", options: ["Hyper Text Markup Language","High Text Machine Language","None","Home Tool"], answer: "Hyper Text Markup Language" },
  { q: "CSS का उपयोग किस लिए होता है?", options: ["Design","Logic","Database","Server"], answer: "Design" },
  { q: "JavaScript क्या है?", options: ["Programming Language","Database","OS","Browser"], answer: "Programming Language" },
  { q: "C++ किस प्रकार की भाषा है?", options: ["Low Level","High Level","Machine","None"], answer: "High Level" },
  { q: "Array क्या होता है?", options: ["Single value","Multiple values","Loop","Function"], answer: "Multiple values" },

  // ===== JS =====
  { q: "JavaScript में '===' क्या करता है?", options: ["Strict Comparison","Assignment","Addition","None"], answer: "Strict Comparison" },
  { q: "NaN का मतलब क्या है?", options: ["Not a Number","New Array Node","Null and Null","None"], answer: "Not a Number" },
  { q: "JavaScript में कौन सा datatype नहीं है?", options: ["Boolean","Float","String","Undefined"], answer: "Float" },
  { q: "setTimeout क्या करता है?", options: ["Delay execution","Loop","Store data","None"], answer: "Delay execution" },
  { q: "Closure क्या है?", options: ["Function with scope","Loop","Array","None"], answer: "Function with scope" },

  // ===== DSA =====
  { q: "Stack किस principle पर काम करता है?", options: ["FIFO","LIFO","Random","None"], answer: "LIFO" },
  { q: "Queue किस principle पर काम करता है?", options: ["FIFO","LIFO","Stack","None"], answer: "FIFO" },
  { q: "Binary Search की time complexity क्या है?", options: ["O(n)","O(log n)","O(n²)","O(1)"], answer: "O(log n)" },
  { q: "Merge Sort की complexity क्या है?", options: ["O(n log n)","O(n²)","O(n)","O(log n)"], answer: "O(n log n)" },
  { q: "Linked List में access time क्या होता है?", options: ["O(1)","O(n)","O(log n)","O(n²)"], answer: "O(n)" },

  // ===== DBMS =====
  { q: "Primary Key क्या होता है?", options: ["Unique Identifier","Duplicate Key","Foreign Key","None"], answer: "Unique Identifier" },
  { q: "SQL का full form क्या है?", options: ["Structured Query Language","Simple Query Language","Standard Query Logic","None"], answer: "Structured Query Language" },
  { q: "JOIN का उपयोग क्यों होता है?", options: ["Tables combine","Delete data","Insert data","None"], answer: "Tables combine" },
  { q: "Normalization का उद्देश्य क्या है?", options: ["Reduce redundancy","Increase size","Delete data","None"], answer: "Reduce redundancy" },
  { q: "Foreign Key क्या करता है?", options: ["Link tables","Delete table","Sort data","None"], answer: "Link tables" },

  // ===== OS =====
  { q: "OS का full form क्या है?", options: ["Operating System","Open Software","Object System","None"], answer: "Operating System" },
  { q: "Process क्या है?", options: ["Program in execution","File","Memory","None"], answer: "Program in execution" },
  { q: "Deadlock क्या है?", options: ["Resource waiting","Crash","Error","None"], answer: "Resource waiting" },
  { q: "RAM क्या है?", options: ["Temporary Memory","Permanent Memory","CPU","None"], answer: "Temporary Memory" },
  { q: "Virtual Memory क्या है?", options: ["Extended RAM","Hard disk","Cache","None"], answer: "Extended RAM" },

  // ===== OOP =====
  { q: "Encapsulation क्या है?", options: ["Data hiding","Inheritance","Polymorphism","None"], answer: "Data hiding" },
  { q: "Inheritance क्या है?", options: ["Reuse code","Hide data","Loop","None"], answer: "Reuse code" },
  { q: "Polymorphism क्या है?", options: ["Multiple forms","Single form","Loop","None"], answer: "Multiple forms" },
  { q: "Abstraction क्या है?", options: ["Hide complexity","Show all","Loop","None"], answer: "Hide complexity" },
  { q: "Class क्या है?", options: ["Blueprint","Object","Function","None"], answer: "Blueprint" },

  // ===== Advanced JS =====
  { q: "Promise क्या है?", options: ["Async result","Loop","Array","None"], answer: "Async result" },
  { q: "Async/Await किसके लिए है?", options: ["Handle async","Loop","DB","None"], answer: "Handle async" },
  { q: "Event Loop क्या है?", options: ["JS mechanism","Loop","Error","None"], answer: "JS mechanism" },
  { q: "Callback क्या है?", options: ["Function as argument","Loop","Array","None"], answer: "Function as argument" },
  { q: "Hoisting क्या है?", options: ["Move declarations","Loop","Error","None"], answer: "Move declarations" },

  // ===== Networking =====
  { q: "HTTP क्या है?", options: ["Protocol","Language","OS","None"], answer: "Protocol" },
  { q: "HTTPS क्या है?", options: ["Secure HTTP","Normal HTTP","Language","None"], answer: "Secure HTTP" },
  { q: "IP Address क्या है?", options: ["Unique address","Name","URL","None"], answer: "Unique address" },
  { q: "DNS क्या करता है?", options: ["Resolve domain","Store data","Encrypt","None"], answer: "Resolve domain" },
  { q: "Port क्या है?", options: ["Communication endpoint","Memory","File","None"], answer: "Communication endpoint" },

  // ===== बाकी mix (to reach 100) =====
  { q: "Git क्या है?", options: ["Version Control","Language","DB","None"], answer: "Version Control" },
  { q: "GitHub क्या है?", options: ["Code hosting","IDE","OS","None"], answer: "Code hosting" },
  { q: "API क्या है?", options: ["Interface","Language","DB","None"], answer: "Interface" },
  { q: "REST API क्या है?", options: ["Web service","DB","OS","None"], answer: "Web service" },
  { q: "JSON क्या है?", options: ["Data format","Language","DB","None"], answer: "Data format" },

  { q: "Big-O क्या बताता है?", options: ["Complexity","Memory","Error","None"], answer: "Complexity" },
  { q: "Recursion क्या है?", options: ["Function calls itself","Loop","Array","None"], answer: "Function calls itself" },
  { q: "Heap क्या है?", options: ["Memory structure","Stack","Queue","None"], answer: "Memory structure" },
  { q: "Tree क्या है?", options: ["Hierarchical DS","Linear","Array","None"], answer: "Hierarchical DS" },
  { q: "Graph क्या है?", options: ["Nodes & edges","Tree","Array","None"], answer: "Nodes & edges" }

],

  army: [
    {
      q: "Indian Army का motto क्या है?",
      options: ["Service Before Self", "Nation First", "Jai Hind", "Duty"],
      answer: "Service Before Self"
    },
    {
      q: "Army Day कब मनाया जाता है?",
      options: ["15 Jan", "26 Jan", "15 Aug", "2 Oct"],
      answer: "15 Jan"
    },
     { q: "MP का राज्य फूल क्या है?", options: ["कमल","गुलाब","चमेली","लिली"], answer: "कमल" },
  { q: "MP में सबसे लंबी नदी कौन सी है?", options: ["नर्मदा","ताप्ती","चंबल","बेतवा"], answer: "नर्मदा" },
  { q: "भोपाल किस झील के लिए प्रसिद्ध है?", options: ["ऊपरी झील","डल झील","चिल्का","वुलर"], answer: "ऊपरी झील" },

  // ===== India GK =====
  { q: "भारत की राजधानी क्या है?", options: ["दिल्ली","मुंबई","कोलकाता","चेन्नई"], answer: "दिल्ली" },
  { q: "भारत का राष्ट्रीय पशु कौन है?", options: ["शेर","बाघ","हाथी","घोड़ा"], answer: "बाघ" },
  { q: "भारत का राष्ट्रीय पक्षी कौन है?", options: ["मोर","तोता","कबूतर","हंस"], answer: "मोर" },
  { q: "भारत का राष्ट्रीय गान क्या है?", options: ["जन गण मन","वंदे मातरम्","जय हिंद","सारे जहाँ से अच्छा"], answer: "जन गण मन" },
  { q: "भारत का संविधान कब लागू हुआ?", options: ["1947","1950","1949","1952"], answer: "1950" },
  { q: "भारत का पहला राष्ट्रपति कौन था?", options: ["नेहरू","गांधी","राजेंद्र प्रसाद","पटेल"], answer: "राजेंद्र प्रसाद" },
  { q: "भारत का सबसे बड़ा राज्य कौन सा है?", options: ["MP","UP","राजस्थान","महाराष्ट्र"], answer: "राजस्थान" },
  { q: "भारत की सबसे लंबी नदी कौन सी है?", options: ["गंगा","यमुना","नर्मदा","गोदावरी"], answer: "गंगा" },
  { q: "सूर्य किस दिशा में उगता है?", options: ["पूर्व","पश्चिम","उत्तर","दक्षिण"], answer: "पूर्व" },
  { q: "विश्व का सबसे बड़ा महाद्वीप कौन सा है?", options: ["एशिया","अफ्रीका","यूरोप","ऑस्ट्रेलिया"], answer: "एशिया" },

  // ===== Math =====
  { q: "5 + 7 = ?", options: ["10","11","12","13"], answer: "12" },
  { q: "10 × 5 = ?", options: ["40","50","60","45"], answer: "50" },
  { q: "20 ÷ 4 = ?", options: ["4","5","6","7"], answer: "5" },
  { q: "5 + 7 = ?", options: ["10","11","12","13"], answer: "12", category: "Math", difficulty: "easy" },
  { q: "10 × 5 = ?", options: ["40","50","60","45"], answer: "50", category: "Math", difficulty: "easy" },
  { q: "20 ÷ 4 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "15 - 6 = ?", options: ["7","8","9","10"], answer: "9", category: "Math", difficulty: "easy" },
  { q: "9 × 3 = ?", options: ["27","21","24","30"], answer: "27", category: "Math", difficulty: "easy" },
  { q: "8 + 6 = ?", options: ["13","14","15","16"], answer: "14", category: "Math", difficulty: "easy" },
  { q: "50 ÷ 10 = ?", options: ["4","5","6","7"], answer: "5", category: "Math", difficulty: "easy" },
  { q: "12 × 2 = ?", options: ["20","22","24","26"], answer: "24", category: "Math", difficulty: "easy" },
  { q: "30 - 10 = ?", options: ["10","15","20","25"], answer: "20", category: "Math", difficulty: "easy" },
  { q: "7 + 8 = ?", options: ["14","15","16","17"], answer: "15", category: "Math", difficulty: "easy" },

    {
      q: "Indian Army का मुख्यालय कहाँ है?",
      options: ["दिल्ली", "मुंबई", "कोलकाता", "चेन्नई"],
      answer: "दिल्ली"
    },
     { q: "भारत की राजधानी क्या है?", options: ["दिल्ली","मुंबई","कोलकाता","चेन्नई"], answer: "दिल्ली", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय पशु कौन है?", options: ["शेर","बाघ","हाथी","घोड़ा"], answer: "बाघ", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय पक्षी कौन है?", options: ["मोर","कबूतर","तोता","हंस"], answer: "मोर", category: "GK", difficulty: "easy" },
  { q: "सूर्य किस दिशा में उगता है?", options: ["पूर्व","पश्चिम","उत्तर","दक्षिण"], answer: "पूर्व", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय फूल कौन सा है?", options: ["गुलाब","कमल","गेंदा","चमेली"], answer: "कमल", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय गान क्या है?", options: ["वंदे मातरम्","जन गण मन","जय हिंद","सारे जहाँ से अच्छा"], answer: "जन गण मन", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय खेल क्या है?", options: ["क्रिकेट","हॉकी","फुटबॉल","कबड्डी"], answer: "हॉकी", category: "GK", difficulty: "easy" },
  { q: "भारत की सबसे लंबी नदी कौन सी है?", options: ["गंगा","यमुना","नर्मदा","गोदावरी"], answer: "गंगा", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय फल कौन सा है?", options: ["सेब","आम","केला","अंगूर"], answer: "आम", category: "GK", difficulty: "easy" },
  { q: "भारत का राष्ट्रीय वृक्ष कौन सा है?", options: ["नीम","बरगद","पीपल","आम"], answer: "बरगद", category: "GK", difficulty: "easy" },

    {
      q: "Army में सबसे ऊँचा पद कौन सा है?",
      options: ["Captain", "Major", "General", "Colonel"],
      answer: "General"
    },
    {
      q: "NDA क्या है?",
      options: ["Defence Academy", "Army Unit", "Police", "None"],
      answer: "Defence Academy"
    },
     { q: "पानी का रासायनिक सूत्र क्या है?", options: ["H2O","CO2","O2","NaCl"], answer: "H2O" },
  { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", options: ["206","210","200","205"], answer: "206" },
  { q: "CO2 का पूरा नाम क्या है?", options: ["Carbon Dioxide","Oxygen","Hydrogen","Nitrogen"], answer: "Carbon Dioxide" },
  { q: "सूर्य एक क्या है?", options: ["तारा","ग्रह","उपग्रह","धूमकेतु"], answer: "तारा" },
  { q: "हम किस गैस में सांस लेते हैं?", options: ["ऑक्सीजन","नाइट्रोजन","CO2","हाइड्रोजन"], answer: "ऑक्सीजन" },

  ],

  jee: [

  // ===== Basics (your existing) =====
  { q: "H2O क्या है?", options: ["Hydrogen","Oxygen","Water","Salt"], answer: "Water" },
  { q: "Newton का दूसरा नियम क्या है?", options: ["F=ma","E=mc²","V=IR","None"], answer: "F=ma" },
  { q: "Speed का formula क्या है?", options: ["Distance/Time","Time/Distance","Mass/Speed","None"], answer: "Distance/Time" },
  { q: "Electron पर charge कितना होता है?", options: ["Positive","Negative","Neutral","None"], answer: "Negative" },
  { q: "1 mole में कितने particles होते हैं?", options: ["6.022×10^23","10^10","1000","None"], answer: "6.022×10^23" },

  // ================= PHYSICS =================
  { q: "Work का SI unit क्या है?", options: ["Joule","Watt","Newton","Pascal"], answer: "Joule" },
  { q: "Acceleration का formula क्या है?", options: ["v-u/t","F/m","s/t","None"], answer: "v-u/t" },
  { q: "Gravitational force का formula क्या है?", options: ["Gm1m2/r²","F=ma","E=mc²","None"], answer: "Gm1m2/r²" },
  { q: "Power का SI unit क्या है?", options: ["Watt","Joule","Newton","Volt"], answer: "Watt" },
  { q: "Ohm’s law क्या है?", options: ["V=IR","F=ma","P=VI","None"], answer: "V=IR" },
  { q: "Escape velocity किस पर depend नहीं करती?", options: ["Mass","Radius","Time","Gravity"], answer: "Time" },
  { q: "Capacitance का formula क्या है?", options: ["Q/V","V/I","I/R","None"], answer: "Q/V" },
  { q: "Frequency की unit क्या है?", options: ["Hz","m/s","kg","N"], answer: "Hz" },
  { q: "Wave speed formula क्या है?", options: ["fλ","v/t","s/t","None"], answer: "fλ" },
  { q: "Lens formula क्या है?", options: ["1/f=1/v+1/u","V=IR","F=ma","None"], answer: "1/f=1/v+1/u" },

  // ================= CHEMISTRY =================
  { q: "pH value 7 क्या दर्शाती है?", options: ["Neutral","Acidic","Basic","None"], answer: "Neutral" },
  { q: "Strong acid कौन सा है?", options: ["HCl","CH3COOH","NH3","NaOH"], answer: "HCl" },
  { q: "Periodic table में कितने periods होते हैं?", options: ["7","8","6","9"], answer: "7" },
  { q: "Atomic number क्या दर्शाता है?", options: ["Protons","Neutrons","Electrons","None"], answer: "Protons" },
  { q: "Hybridization sp3 में bond angle कितना होता है?", options: ["109.5°","120°","180°","90°"], answer: "109.5°" },
  { q: "Avogadro number क्या है?", options: ["6.022×10^23","10^23","1000","None"], answer: "6.022×10^23" },
  { q: "Oxidation क्या है?", options: ["Loss of electrons","Gain of electrons","Neutral","None"], answer: "Loss of electrons" },
  { q: "Reduction क्या है?", options: ["Gain of electrons","Loss of electrons","None","Neutral"], answer: "Gain of electrons" },
  { q: "Ideal gas equation क्या है?", options: ["PV=nRT","F=ma","E=mc²","None"], answer: "PV=nRT" },
  { q: "Catalyst क्या करता है?", options: ["Increase rate","Decrease rate","Stop reaction","None"], answer: "Increase rate" },

  // ================= MATHEMATICS =================
  { q: "Derivative of x² क्या है?", options: ["2x","x","x²","1"], answer: "2x" },
  { q: "∫ x dx क्या है?", options: ["x²/2","x","2x","None"], answer: "x²/2" },
  { q: "sin²θ + cos²θ = ?", options: ["1","0","2","None"], answer: "1" },
  { q: "log(1) = ?", options: ["0","1","-1","None"], answer: "0" },
  { q: "Determinant 2x2 formula क्या है?", options: ["ad-bc","ab+cd","a+b","None"], answer: "ad-bc" },
  { q: "Slope formula क्या है?", options: ["(y2-y1)/(x2-x1)","x+y","y-x","None"], answer: "(y2-y1)/(x2-x1)" },
  { q: "Quadratic formula क्या है?", options: ["(-b±√b²-4ac)/2a","ax+b","None","x²"], answer: "(-b±√b²-4ac)/2a" },
  { q: "Probability की range क्या है?", options: ["0-1","1-10","-1 to 1","None"], answer: "0-1" },
  { q: "Permutation formula क्या है?", options: ["nPr=n!/(n-r)!","nCr","n+r","None"], answer: "nPr=n!/(n-r)!" },
  { q: "Combination formula क्या है?", options: ["nCr=n!/(r!(n-r)!)","nPr","None","n+r"], answer: "nCr=n!/(r!(n-r)!)" },

  // ================= HARD LEVEL =================
  { q: "Electric field का unit क्या है?", options: ["N/C","Volt","Ampere","Ohm"], answer: "N/C" },
  { q: "Work-energy theorem क्या है?", options: ["Work=ΔK","F=ma","E=mc²","None"], answer: "Work=ΔK" },
  { q: "Entropy का SI unit क्या है?", options: ["J/K","J","K","None"], answer: "J/K" },
  { q: "Planck constant का unit क्या है?", options: ["Js","J","Hz","None"], answer: "Js" },
  { q: "Half-life formula क्या है?", options: ["0.693/λ","λ/2","None","t/2"], answer: "0.693/λ" },

  { q: "Limit x→0 sinx/x = ?", options: ["1","0","∞","None"], answer: "1" },
  { q: "Matrix multiplication कब possible है?", options: ["Columns=Rows","Same size","Square only","None"], answer: "Columns=Rows" },
  { q: "Eigen value किससे related है?", options: ["Matrix","Vector","Scalar","None"], answer: "Matrix" }

]
};


function initTest() {
  const testtype = questionbank[testid];
 
 
  // question random order
  testQuestions = shuffleArray(testtype);

  

  userAnswers = new Array(testQuestions.length).fill(null);

}


// Remove active (GLOBAL bana diya)
function removeActive() {
  options.forEach(opt => opt.classList.remove("active"));
  selectedAnswer = null;
}

// Load Question
function loadquestion() {

  // const testtype = questionbank[testid];

if (!testQuestions || currentQ >= testQuestions.length)
  
  if (currentQ >= testtype.length) {
    alert("Test Completed 🎉");
    alert(`Correct: ${correctCount}\nWrong: ${wrongCount}`);
    return;
  }

  const q = testQuestions[currentQ];

  question.innerText = q.q;

  options.forEach((opt, index) => {
    opt.innerText = q.options[index];
 

   removeActive(); //reset after every question

    if (userAnswers[currentQ] === q.options[index]) {
      opt.classList.add("active");
      selectedAnswer = q.options[index];
    }
  
 });

  //  visit agar nahi kiya to skip mark kar do
  if (status[currentQ] === "notVisited") {
    status[currentQ] = "skipped";
  }

  updateBoxes();
}


function initStatus() {
  const testtype = questionbank[testid];
  status = new Array(testtype.length).fill("notVisited");
}


initTest();
initStatus();
createQuestionBoxes();
loadquestion();



function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}


// Option click
options.forEach(option => {
  option.addEventListener("click", () => {
    removeActive();
    option.classList.add("active");
    selectedAnswer = option.innerText;
    
    userAnswers[currentQ] = selectedAnswer; // Save user's answer
    status[currentQ] = "answered"; // Mark as answered
    updateBoxes();
  });
});


//clear button slecrtions
if (clearbtn) {
  clearbtn.addEventListener("click", removeActive);
  updateBoxes();
   status[currentQ] = "skipped";
}



//save next question answer
submitbtn.addEventListener("click", () => {
 
  if (!selectedAnswer) {
    status[currentQ] = "skipped";
  }

  if (currentQ < testQuestions.length - 1) {
    currentQ++;
    selectedAnswer = null;
    loadquestion();
  }

  if(currentQ === testQuestions.length - 1) {
  
    document.querySelector("#subbt").style.display = "none";
      alert("Test Completed 🎉");
    return;
  }else {
    document.querySelector("#subbt").style.display = "block";
  }

});

 
//status box in section pannel

function createQuestionBoxes() {
  const testtype = questionbank[testid];

  section.innerHTML = "";

  testtype.forEach((_, index) => {
    const box = document.createElement("div");
    box.classList.add("qbox");
    box.innerText = index + 1;

    box.addEventListener("click", () => {
      currentQ = index;
       document.querySelector("#subbt").style.display = "block";
      loadquestion();
      updateBoxes();
    });

    section.appendChild(box);
  });
}

function updateBoxes() {
  const allBoxes = document.querySelectorAll(".qbox");

  allBoxes.forEach((box, index) => {
    box.classList.remove("green", "red", "blue");

    if (index === currentQ) {
      box.classList.add("blue"); // current
    } else if (status[index] === "answered") {
      box.classList.add("green");
    } else if (status[index] === "skipped") {
      box.classList.add("red");
    }
  });
}


const finalSubmit = document.getElementById("finalSubmit");

finalSubmit.addEventListener("click", function submitTest() {

  let correctCount = 0;
  let wrongCount = 0;

  const test = testQuestions; // questionbank[testid] ki jagah testQuestions use karenge

  test.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  alert(`✅ Correct: ${correctCount}\n❌ Wrong: ${wrongCount}`);
   window.location.href = "index.html";
});



// timer 
const timerElement = document.getElementById("settime");

let totalTime = testQuestions.length * 60; // seconds

const timer = setInterval(() => {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;

  // format 2 digit
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerElement.innerText = `${minutes}:${seconds}`;

  totalTime--;

  if (totalTime < 0) {
    clearInterval(timer);
    timerElement.innerText = "Time Up";
    
    alert("Test Completed 🎉");
    window.location.href = "index.html"; // Redirect to result page (you can create this page to show results)
    // submit function call 
    submitTest();
  }

}, 1000);
