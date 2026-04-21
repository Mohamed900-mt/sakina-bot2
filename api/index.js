const fetch = require('node-fetch');
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${8313086912:AAGh21z8K7Wnh9oDShjKG7KS_tP_wy_0gF0}`;
const CHANNEL_ID = "@sakina_6"; // يوزر قناتك
const CHANNEL_URL = "https://t.me/sakina_6"; // رابط قناتك

// دالة الإرسال الأساسية
async function tg(method, body) {
  try {
    await fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (e) {
    console.error("Error calling Telegram API:", e);
  }
}

// دالة التحقق من الاشتراك الإجباري
async function checkSub(userId) {
  try {
    const resp = await fetch(`${API}/getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`);
    const data = await resp.json();
    // التحقق لو المستخدم عضو، أدمن، أو صاحب القناة
    return ["creator", "administrator", "member"].includes(data.result?.status);
  } catch (e) {
    return true; // في حالة حدوث خطأ تقني بنخليه يكمل عشان البوت ميتوقفش
  }
}

// مصفوفات البيانات (أحاديث، أدعية، تفسير)
const ahadith = ['1. قال محمد بن عبد الله:\n"إنما الأعمال بالنيات"\n\n*التفسير:*\nأي عمل بتعمله قيمته عند ربنا على حسب نيتك.','2. قال محمد بن عبد الله:\n"الدين النصيحة"\n\n*التفسير:*\nالدين كله قائم على الصدق والإخلاص.','3. قال محمد بن عبد الله:\n"لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"\n\n*التفسير:*\nالإيمان الكامل إنك تتمنى الخير لغيرك.','4. قال محمد بن عبد الله:\n"المسلم من سلم المسلمون من لسانه ويده"\n\n*التفسير:*\nالمسلم الحقيقي ما بيأذيش غيره.','5. قال محمد بن عبد الله:\n"تبسمك في وجه أخيك صدقة"\n\n*التفسير:*\nحتى الابتسامة عمل خير.','6. قال محمد بن عبد الله:\n"الكلمة الطيبة صدقة"\n\n*التفسير:*\nأي كلمة حلوة بتقولها صدقة.','7. قال محمد بن عبد الله:\n"من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت"\n\n*التفسير:*\nلو مش هتقول كلام كويس، اسكت.','8. قال محمد بن عبد الله:\n"خير الناس أنفعهم للناس"\n\n*التفسير:*\nأفضل الناس اللي بيفيد غيره.','9. قال محمد بن عبد الله:\n"الراحمون يرحمهم الرحمن"\n\n*التفسير:*\nلو بتتعامل برحمة، ربنا يرحمك.','10. قال محمد بن عبد الله:\n"اتق الله حيثما كنت"\n\n*التفسير:*\nخلي ربنا في بالك في كل وقت ومكان.'];
const ad3eya = ['1. "اللهم اهدني فيمن هديت"\n\n*التفسير:*\nبتطلب من ربنا يهديك للطريق الصح.','2. "اللهم إني أسألك العفو والعافية"\n\n*التفسير:*\nبتسأل ربنا يسامحك ويحفظك.','3. "اللهم اغفر لي ذنبي كله دقه وجله"\n\n*التفسير:*\nبتطلب مغفرة كل الذنوب.','4. "اللهم ارزقني رزقاً طيباً مباركاً فيه"\n\n*التفسير:*\nرزق حلال وفيه بركة.','5. "اللهم إني أعوذ بك من الهم والحزن"\n\n*التفسير:*\nبتستعيذ من الضيق النفسي.','6. "اللهم أصلح لي ديني ودنياي"\n\n*التفسير:*\nبتطلب إصلاح حياتك كلها.','7. "اللهم تقبل مني إنك أنت السميع العليم"\n\n*التفسير:*\nربنا يقبل أعمالك وعبادتك.','8. "اللهم اجعلني من التوابين واجعلني من المتطهرين"\n\n*التفسير:*\nتبقى دايماً تائباً ومتطهراً.','9. "اللهم إني أسألك الجنة وأعوذ بك من النار"\n\n*التفسير:*\nأبسط وأهم دعاء.','10. "اللهم ثبت قلبي على دينك"\n\n*التفسير:*\nثابت على الإيمان مهما حصل.'];
const tafseer = ["1. ﴿إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾\n\n*التفسير:*\nأي ضيق معاه فرج قريب.","2. ﴿وَاللَّهُ غَفُورٌ رَّحِيمٌ﴾\n\n*التفسير:*\nربنا بيسامح ويرحم مهما كانت الذنوب.","3. ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾\n\n*التفسير:*\nدايماً اطلب العلم.","4. ﴿إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾\n\n*التفسير:*\nاللي يصبر ربنا معاه.","5. ﴿وَلَا تَيْأَسُوا مِن رَّوحِ اللَّهِ﴾\n\n*التفسير:*\nممنوع تفقد الأمل في رحمة ربنا.","6. ﴿فَاذْكُرُونِي أَذْكُرْكُمْ﴾\n\n*التفسير:*\nاذكر ربنا يذكرك برحمته.","7. ﴿إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ﴾\n\n*التفسير:*\nأي خير بتعمله مش هيضيع.","8. ﴿وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ﴾\n\n*التفسير:*\nربنا قريب منك في كل مكان.","9. ﴿وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ﴾\n\n*التفسير:*\nمش كل حاجة تضايقك شر.","10. ﴿إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ﴾\n\n*التفسير:*\nربنا قريب وبيسمع دعاءك."];

// نصوص الأذكار
const morningText = "☀️ *أذكار الصباح:*\n\n• آية الكرسي والمعوذات\n• سيد الاستغفار\n• أصبحنا وأصبح الملك لله\n• بسم الله الذي لا يضر مع اسمه شيء (3 مرات)\n• رضيت بالله رباً (3 مرات)\n• يا حي يا قيوم برحمتك أستغيث\n• سبحان الله وبحمده (100 مرة)\n• الصلاة على النبي (10 مرات)";
const eveningText = "🌙 *أذكار المساء:*\n\n• آية الكرسي والمعوذات (3 مرات)\n• سيد الاستغفار\n• أمسينا وأمسى الملك لله\n• بسم الله الذي لا يضر مع اسمه شيء (3 مرات)\n• أعوذ بكلمات الله التامات (3 مرات)\n• سبحان الله وبحمده (100 مرة)\n• الصلاة على النبي (10 مرات)";
const sleepText = "😴 *أذكار النوم:*\n\n• المعوذات والنفث (3 مرات)\n• آية الكرسي\n• خواتيم سورة البقرة\n• باسمك ربي وضعت جنبي\n• سبحان الله (33)، الحمد لله (33)، الله أكبر (34)\n• سورة الملك";
const prayerText = "🕌 *أذكار بعد الصلاة:*\n\n• أستغفر الله (3 مرات)\n• اللهم أنت السلام ومنك السلام\n• سبحان الله (33)، الحمد لله (33)، الله أكبر (33)\n• آية الكرسي والمعوذات";

// تعريف الأزرار والقوائم
const mainMenu = () => ({
  inline_keyboard: [
    [{ text: "✨ أذكار", callback_data: "azkar_menu" }, { text: "🕒 مواقيت الصلاة", callback_data: "prayer_times" }],
    [{ text: "📜 أحاديث", callback_data: "hadith_0" }, { text: "🤲 أدعية", callback_data: "doa_0" }],
    [{ text: "📖 تفسير آيات", callback_data: "tafseer_0" }],
    [{ text: "📢 قناة البوت", url: CHANNEL_URL }, { text: "💬 للتواصل", url: "https://t.me/zsznr" }]
  ]
});

const azkarMenu = () => ({inline_keyboard:[[{text:"☀️ صباح",callback_data:"az_morning"},{text:"🌙 مساء",callback_data:"az_evening"}],[{text:"😴 نوم",callback_data:"az_sleep"},{text:"🕌 بعد الصلاة",callback_data:"az_prayer"}],[{text:"🔙 رجوع",callback_data:"main_menu"}]]});
const backMain = () => ({inline_keyboard:[[{text:"🔙 رجوع",callback_data:"main_menu"}]]});
const backAzkar = () => ({inline_keyboard:[[{text:"🔙 رجوع",callback_data:"azkar_menu"}]]});

// الفانكشن الأساسية لمعالجة طلبات Vercel
export default async function handler(req, res) {
  // للرد على أي طلب GET (زي UptimeRobot) لضمان اللمبة الخضراء
  if (req.method === "GET") {
    return res.status(200).send("Sakina Bot is Online! 🚀");
  }

  // الرد الفوري لـ Telegram بـ OK عشان ميكررش الرسالة
  res.status(200).send("OK");

  if (req.method !== "POST") return;
  const u = req.body;

  // جلب معرف المستخدم سواء من رسالة أو ضغطة زر
  const userId = u.message?.from.id || u.callback_query?.from.id;
  if (!userId) return;

  // 1. التحقق من الاشتراك الإجباري أولاً
  const isSubscribed = await checkSub(userId);
  if (!isSubscribed) {
    const subMsg = "⚠️ عذراً يا أخي، يجب عليك الاشتراك في قناة البوت أولاً لتتمكن من استخدامه.";
    const subMarkup = {
      inline_keyboard: [
        [{ text: "✅ اشترك في القناة من هنا", url: CHANNEL_URL }],
        [{ text: "تم الاشتراك ✅ (تفعيل)", callback_data: "main_menu" }]
      ]
    };
    
    if (u.message) {
      await tg("sendMessage", { chat_id: userId, text: subMsg, reply_markup: subMarkup });
    } else if (u.callback_query) {
      await tg("answerCallbackQuery", { callback_query_id: u.callback_query.id, text: "يجب الاشتراك في القناة أولاً!", show_alert: true });
    }
    return;
  }

  // 2. معالجة أمر /start
  if (u.message?.text === "/start") {
    await tg("sendMessage", {chat_id:userId, text:"مرحباً بك في بوت سكينة 🌙\nطريقك للأذكار والأدعية اليومية.\nاختر من القائمة بالأسفل:", reply_markup:mainMenu()});
    return;
  }

  const call = u.callback_query;
  if (!call) return;
  const chatId = call.message.chat.id, msgId = call.message.message_id;

  // إغلاق علامة التحميل على الزر في تليجرام
  await tg("answerCallbackQuery", {callback_query_id: call.id});

  // 3. معالجة ضغطات الأزرار (Navigation)
  if (call.data === "main_menu") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"مرحباً بك في بوت سكينة 🌙\nاختر من القائمة بالأسفل:",reply_markup:mainMenu()});
  } else if (call.data === "azkar_menu") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"اختر نوع الأذكار:",reply_markup:azkarMenu()});
  } else if (call.data === "az_morning") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:morningText,parse_mode:"Markdown",reply_markup:backAzkar()});
  } else if (call.data === "az_evening") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:eveningText,parse_mode:"Markdown",reply_markup:backAzkar()});
  } else if (call.data === "az_sleep") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:sleepText,parse_mode:"Markdown",reply_markup:backAzkar()});
  } else if (call.data === "az_prayer") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:prayerText,parse_mode:"Markdown",reply_markup:backAzkar()});
  } else if (call.data === "prayer_times") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"🕋 *مواقيت الصلاة في القاهرة:*\n\nالفجر: 4:00 ص\nالشروق: 5:30 ص\nالظهر: 11:55 ص\nالعصر: 3:30 م\nالمغرب: 6:20 م\nالعشاء: 7:40 م",parse_mode:"Markdown",reply_markup:backMain()});
  } else {
    // نظام التنقل التلقائي للأحاديث والأدعية والتفسير
    const parts = call.data.split("_");
    const cat = parts[0], idx = parseInt(parts[1]??0,10);
    const lists = {hadith:ahadith, doa:ad3eya, tafseer};
    const list = lists[cat];
    if (list) {
      const txt = list[idx]??"";
      const next = `${cat}_${(idx+1)%list.length}`;
      await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:txt,parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"➡️ التالي",callback_data:next}],[{text:"🔙 رجوع",callback_data:"main_menu"}]]}});
    }
  }
}
