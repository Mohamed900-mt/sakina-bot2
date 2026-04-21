const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).send("Sakina Bot is Online! 🚀");
  if (req.method === "POST") res.status(200).send("OK");

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const API = `https://api.telegram.org/bot${TOKEN}`;
  const CHANNEL_ID = "@sakina_6"; 
  const CHANNEL_URL = "https://t.me/sakina_6";

  async function tg(method, body) {
    try {
      await fetch(`${API}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (e) { console.error(e); }
  }

  async function checkSub(userId) {
    try {
      const resp = await fetch(`${API}/getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`);
      const data = await resp.json();
      return ["creator", "administrator", "member"].includes(data.result?.status);
    } catch (e) { return true; }
  }

  const ahadith = ['1. قال محمد بن عبد الله:\n"إنما الأعمال بالنيات"\n\n*التفسير:*\nأي عمل بتعمله قيمته عند ربنا على حسب نيتك.','2. قال محمد بن عبد الله:\n"الدين النصيحة"\n\n*التفسير:*\nالدين كله قائم على الصدق والإخلاص.','3. قال محمد بن عبد الله:\n"لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"\n\n*التفسير:*\nالإيمان الكامل إنك تتمنى الخير لغيرك.','4. قال محمد بن عبد الله:\n"المسلم من سلم المسلمون من لسانه ويده"\n\n*التفسير:*\nالمسلم الحقيقي ما بيأذيش غيره.','5. قال محمد بن عبد الله:\n"تبسمك في وجه أخيك صدقة"\n\n*التفسير:*\nحتى الابتسامة عمل خير.','6. قال محمد بن عبد الله:\n"الكلمة الطيبة صدقة"\n\n*التفسير:*\nأي كلمة حلوة بتقولها صدقة.','7. قال محمد بن عبد الله:\n"من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت"\n\n*التفسير:*\nلو مش هتقول كلام كويس، اسكت.','8. قال محمد بن عبد الله:\n"خير الناس أنفعهم للناس"\n\n*التفسير:*\nأفضل الناس اللي بيفيد غيره.','9. قال محمد بن عبد الله:\n"الراحمون يرحمهم الرحمن"\n\n*التفسير:*\nلو بتتعامل برحمة، ربنا يرحمك.','10. قال محمد بن عبد الله:\n"اتق الله حيثما كنت"\n\n*التفسير:*\nخلي ربنا في بالك في كل وقت ومكان.'];
  const ad3eya = ['1. "اللهم اهدني فيمن هديت"\n\n*التفسير:*\nبتطلب من ربنا يهديك للطريق الصح.','2. "اللهم إني أسألك العفو والعافية"\n\n*التفسير:*\nبتسأل ربنا يسامحك ويحفظك.','3. "اللهم اغفر لي ذنبي كله دقه وجله"\n\n*التفسير:*\nبتطلب مغفرة كل الذنوب.','4. "اللهم ارزقني رزقاً طيباً مباركاً فيه"\n\n*التفسير:*\nرزق حلال وفيه بركة.','5. "اللهم إني أعوذ بك من الهم والحزن"\n\n*التفسير:*\nبتستعيذ من الضيق النفسي.','6. "اللهم أصلح لي ديني ودنياي"\n\n*التفسير:*\nبتطلب إصلاح حياتك كلها.','7. "اللهم تقبل مني إنك أنت السميع العليم"\n\n*التفسير:*\nربنا يقبل أعمالك وعبادتك.','8. "اللهم اجعلني من التوابين واجعلني من المتطهرين"\n\n*التفسير:*\nتبقى دايماً تائباً ومتطهراً.','9. "اللهم إني أسألك الجنة وأعوذ بك من النار"\n\n*التفسير:*\nأبسط وأهم دعاء.','10. "اللهم ثبت قلبي على دينك"\n\n*التفسير:*\nثابت على الإيمان مهما حصل.'];
  const tafseer = ["1. ﴿إِنَّ مَعَ الْعُسْرِ يُسْرًا﴾\n\n*التفسير:*\nأي ضيق معاه فرج قريب.","2. ﴿وَاللَّهُ غَفُورٌ رَّحِيمٌ﴾\n\n*التفسير:*\nربنا بيسامح ويرحم مهما كانت الذنوب.","3. ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾\n\n*التفسير:*\nدايماً اطلب العلم.","4. ﴿إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾\n\n*التفسير:*\nاللي يصبر ربنا معاه.","5. ﴿وَلَا تَيْأَسُوا مِن رَّوحِ اللَّهِ﴾\n\n*التفسير:*\nممنوع تفقد الأمل في رحمة ربنا.","6. ﴿فَاذْكُرُونِي أَذْكُرْكُمْ﴾\n\n*التفسير:*\nاذكر ربنا يذكرك برحمته.","7. ﴿إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ﴾\n\n*التفسير:*\nأي خير بتعمله مش هيضيع.","8. ﴿وَهُـوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ﴾\n\n*التفسير:*\nربنا قريب منك في كل مكان.","9. ﴿وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ﴾\n\n*التفسير:*\nمش كل حاجة تضايقك شر.","10. ﴿إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ﴾\n\n*التفسير:*\nربنا قريب وبيسمع دعاءك."];

  const morningText = "☀️ *أذكار الصباح:*\n\n• آية الكرسي والمعوذات\n• سيد الاستغفار\n• أصبحنا وأصبح الملك لله\n• بسم الله الذي لا يضر مع اسمه شيء (3 مرات)\n• رضيت بالله رباً (3 مرات)\n• يا حي يا قيوم برحمتك أستغيث\n• سبحان الله وبحمده (100 مرة)\n• الصلاة على النبي (10 مرات)";
  const eveningText = "🌙 *أذكار المساء:*\n\n• آية الكرسي والمعوذات (3 مرات)\n• سيد الاستغفار\n• أمسينا وأمسى الملك لله\n• بسم الله الذي لا يضر مع اسمه شيء (3 مرات)\n• أعوذ بكلمات الله التامات (3 مرات)\n• سبحان الله وبحمده (100 مرة)\n• الصلاة على النبي (10 مرات)";
  const sleepText = "😴 *أذكار النوم:*\n\n• المعوذات والنفث (3 مرات)\n• آية الكرسي\n• خواتيم سورة البقرة\n• باسمك ربي وضعت جنبي\n• سبحان الله (33)، الحمد لله (33)، الله أكبر (34)\n• سورة الملك";
  const prayerText = "🕌 *أذكار بعد الصلاة:*\n\n• أستغفر الله (3 مرات)\n• اللهم أنت السلام ومنك السلام\n• سبحان الله (33)، الحمد لله (33)، الله أكبر (33)\n• آية الكرسي والمعوذات";

  const mainMenu = () => ({inline_keyboard:[[{text:"✨ أذكار",callback_data:"azkar_menu"},{text:"🕒 مواقيت الصلاة",callback_data:"prayer_times"}],[{text:"📜 أحاديث",callback_data:"hadith_0"},{text:"🤲 أدعية",callback_data:"doa_0"}],[{text:"📖 تفسير آيات",callback_data:"tafseer_0"}],[{text:"📢 قناة البوت",url:CHANNEL_URL},{text:"💬 للتواصل",url:"https://t.me/zsznr"}]]});
  const azkarMenu = () => ({inline_keyboard:[[{text:"☀️ صباح",callback_data:"az_morning"},{text:"🌙 مساء",callback_data:"az_evening"}],[{text:"😴 نوم",callback_data:"az_sleep"},{text:"🕌 بعد الصلاة",callback_data:"az_prayer"}],[{text:"🔙 رجوع",callback_data:"main_menu"}]]});

  const u = req.body;
  const userId = u.message?.from.id || u.callback_query?.from.id;
  if (!userId) return;

  const isSubscribed = await checkSub(userId);
  if (!isSubscribed) {
    const subMarkup = {inline_keyboard:[[{text:"✅ اشترك في القناة من هنا",url:CHANNEL_URL}],[{text:"تم الاشتراك ✅ (تفعيل)",callback_data:"main_menu"}]]};
    await tg("sendMessage", {chat_id:userId, text:"⚠️ عذراً يا أخي، يجب عليك الاشتراك في قناة البوت أولاً.", reply_markup:subMarkup});
    return;
  }

  if (u.message?.text === "/start") {
    await tg("sendMessage", {chat_id:userId, text:"مرحباً بك في بوت سكينة 🌙", reply_markup:mainMenu()});
    return;
  }

  const call = u.callback_query;
  if (!call) return;
  const chatId = call.message.chat.id, msgId = call.message.message_id;

  if (call.data === "main_menu") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"مرحباً بك في بوت سكينة 🌙",reply_markup:mainMenu()});
  } else if (call.data === "azkar_menu") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"اختر نوع الأذكار:",reply_markup:azkarMenu()});
  } else if (call.data === "az_morning") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:morningText,parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"🔙 رجوع",callback_data:"azkar_menu"}]]}});
  } else if (call.data === "az_evening") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:eveningText,parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"🔙 رجوع",callback_data:"azkar_menu"}]]}});
  } else if (call.data === "az_sleep") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:sleepText,parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"🔙 رجوع",callback_data:"azkar_menu"}]]}});
  } else if (call.data === "az_prayer") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:prayerText,parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"🔙 رجوع",callback_data:"azkar_menu"}]]}});
  } else if (call.data === "prayer_times") {
    await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:"🕋 *مواقيت الصلاة في القاهرة:*\n\nالفجر: 4:00 ص\nالمغرب: 6:20 م\nالعشاء: 7:40 م",parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"🔙 رجوع",callback_data:"main_menu"}]]}});
  } else if (call.data.includes("_")) {
    const [cat, idxStr] = call.data.split("_");
    const idx = parseInt(idxStr);
    const lists = {hadith:ahadith, doa:ad3eya, tafseer};
    const list = lists[cat];
    if (list) {
      const next = `${cat}_${(idx+1)%list.length}`;
      await tg("editMessageText", {chat_id:chatId,message_id:msgId,text:list[idx],parse_mode:"Markdown",reply_markup:{inline_keyboard:[[{text:"➡️ التالي",callback_data:next}],[{text:"🔙 رجوع",callback_data:"main_menu"}]]}});
    }
  }
  await tg("answerCallbackQuery", {callback_query_id: call.id});
};
