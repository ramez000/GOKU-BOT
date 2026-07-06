/*
code: game eye anime
by: 𝐑𝐚𝐦𝐞𝐳
*/

const MAX_ROUNDS = 20;

const NAMES = [
  "غوكو","فيجيتا","ترانكس","غوهان","بيكولو","فريزا","سيل","ماجين بو","برولي","باردوك",
  "لوفي","زورو","نامي","سانجي","اوسوب","تشوبر","روبين","فرانكي","بروك","جينبي",
  "شانكس","اللحية البيضاء","اللحية السوداء","كايدو","بيغ مام","ايس","سابو","لاو","كيد","كروكودايل",
  "ناروتو","ساسكي","ساكورا","كاكاشي","ايتاتشي","مادارا","اوبيتو","ميناتو","جيرايا","تسونادي",
  "اوروتشيمارو","غارا","نيجي","روك لي","هيناتا","شيكامارو","اينو","تشوجي","ساي","ياماتو",
  "بوروتو","سارادا","ميتسوكي","كاواكي","موموشيكي","كود","ايدا","دايمون","كونوهامارو","شينكي",
  "ايرين","ميكاسا","ارمين","ليفاي","هانجي","راينر","بيرتهولد","اني","زيك","اروين",
  "تانجيرو","نيزوكو","زينيتسو","اينوسكي","رينغوكو","توميؤكا","شينوبو","موزان","اكازا","دوما",
  "كوكوشيبو","غيويمي","تينغن","ميتسوري","مويتشيرو","سانيمي","اوباناي","جينيا","كاناو","روي",
  "غوجو","يوجي","ميغومي","نوبارا","يوتا","ماكي","توجي","سوكونا","كينجاكو","ماهيتو",
  "جوجو","تشوسو","اوي","نانامي","مي مي","هاكاري","كاشيمو","هيغوروما","اوراومي","جيتو",
  "ديكو","باكوغو","تودوروكي","اولو مايت","ايزاوا","شيغاراكي","دابي","توغا","اينديفر","هوكس",
  "غون","كيلوا","كورابيكا","ليوريو","هيسوكا","كرولو","ميرويم","نيتيرو","بيسكيت","إيلومي",
  "كانيكي","توكا","جوزو","اريما","يوتـا","نيشيكي","هينامي","ايتوري","تسوكياما","ايتو",
  "إدوارد","ألفونس","روي موستانغ","وينري","كينغ برادلي","إنفي","غريد","لست","لين ياو","مايس هيوز",
  "لايت","إل","ميسا","ريل","ريم","ميلو","نير","سويتشيرو","ماتسودا","تيرو ميكامي",
  "سينكو","تايجو","يوزوريها","تسوكاسا","جين","كروم","كوهكو","سوئيكا","ريوسوي","فرانسوا",
  "استا","يونو","يامي","نويل","ميموزا","ليخت","جوليوس","دانتي","زينون","فانيكا",
  "سايتاما","جينوس","تاتسوماكي","بانغ","غارو","كينغ","فوبوكي","سونيك","بوروس","تشايلد إمبراطور"
];

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const getPrize = (rank) => {
  if (rank === 0) return { xp: 300, money: 10, emoji: "🎉" };
  if (rank === 1) return { xp: 150, money: 5, emoji: "🎖" };
  return { xp: 70, money: 3, emoji: "⭐" };
};

const handler = async (m, { conn }) => {
  const chatId = m.chat;
  if (!global.gameEye) global.gameEye = {};
  
  const g = global.gameEye[chatId];
  if (g?.current) return await conn.sendMessage(chatId, {
    image: { url: g.current.img },
    caption: g.current.caption
  });

  if (!g || g.round >= MAX_ROUNDS) {
    if (g) {
      const sorted = Object.entries(g.scores).sort((a,b) => b[1] - a[1]);
      const prizes = [];
      
      for (let i = 0; i < sorted.length; i++) {
        const [id, score] = sorted[i];
        const prize = getPrize(i);
        if (global.db?.users[id]) {
          global.db.users[id].xp = (global.db.users[id].xp || 0) + prize.xp;
          global.db.users[id].money = (global.db.users[id].money || 0) + prize.money;
        }
        prizes.push(`${prize.emoji} @${id.split('@')[0]} - ${score} نقطة (+${prize.xp}xp)`);
      }
      
      await conn.sendMessage(chatId, {
        text: `🏆 *انتهت اللعبة*\n\n${prizes.join('\n')}`,
        mentions: sorted.map(s => s[0])
      });
    }
    global.gameEye[chatId] = { round: 0, scores: {}, current: null };
  }

  const g2 = global.gameEye[chatId];
  g2.round++;
  
  const data = await fetch("https://raw.githubusercontent.com/fjfilhfjjg-boop/Pomni-AI/refs/heads/main/%D8%B9%D9%8A%D9%86.md").then(r => r.json());
  const char = data[Math.floor(Math.random() * data.length)];
  
  const wrong = shuffle([...NAMES]).filter(n => n !== char.name).slice(0, 3);
  const opts = shuffle([char.name, ...wrong]);
  
  const caption = `👁 خمن الشخصية (${g2.round}/${MAX_ROUNDS})\n\n1. ${opts[0]}\n2. ${opts[1]}\n3. ${opts[2]}\n4. ${opts[3]}`;
  
  const msg = await conn.sendMessage(chatId, {
    image: { url: char.img },
    caption
  });
  
  g2.current = {
    answer: char.name.toLowerCase(),
    opts: opts.map(o => o.toLowerCase()),
    img: char.img,
    caption,
    id: msg.key.id,
    timer: setTimeout(async () => {
      if (global.gameEye[chatId]?.current) {
        const ans = global.gameEye[chatId].current.answer;
        global.gameEye[chatId].current = null;
        await conn.sendMessage(chatId, { text: `⏰ الوقت انتهى! الاجابة: *${ans}*\nاكتب .عين للبدء من جديد` });
      }
    }, 30000)
  };
};

handler.before = async (m, { conn }) => {
  const g = global.gameEye?.[m.chat];
  if (!g?.current) return;
  
  const cur = g.current;
  if (m.quoted?.id !== cur.id && m.text?.toLowerCase() !== cur.answer) return;
  
  const answer = m.text.toLowerCase().trim();
  if (!cur.opts.includes(answer)) return m.reply("❌ إجابة خاطئة");
  
  clearTimeout(cur.timer);
  g.current = null;
  
  if (answer === cur.answer) {
    g.scores[m.sender] = (g.scores[m.sender] || 0) + 1;
    await conn.sendMessage(m.chat, {
      text: `✅ صحيح! تستاهل ${g.scores[m.sender]} نقطة\nانتظر الجولة القادمة...`,
      mentions: [m.sender]
    });
    setTimeout(() => handler(m, { conn }), 200);
  } else {
    await m.reply("❌ إجابة خاطئة");
  }
  return true;
};

handler.command = ['عين', 'eye'];
handler.category = "games";
export default handler;
