import fs from 'fs';

const FILE = './system/anime_names.json';

handler.before = async (m, { conn }) => {  
    if (!m.text || !global.break?.games[m.chat] || !global.break?.scores[m.chat]) return;  

    const game = global.break.games[m.chat];  
    const player = m.sender;  

    if (m.text.trim() !== game.answer) return;  

    clearTimeout(game.timeout);  
    delete global.break.games[m.chat];  

    if (!global.break.scores[m.chat][player]) global.break.scores[m.chat][player] = 0;  
    global.break.scores[m.chat][player]++;  

    // ✅ إضافة نقاط + فلوس
    if (!global.db.users[player]) global.db.users[player] = {};
    global.db.users[player].xp = (global.db.users[player].xp || 0) + 10;
    global.db.users[player].money = (global.db.users[player].money || 0) + 50;

    await m.reply(`✅ صح! +10 XP و +50 فلوس\nمجموعك: ${global.break.scores[m.chat][player]}`);

    handler(m, { conn });  
};  


async function handler(m, { conn }) {  
    if (!global.break) global.break = { games: {}, scores: {}, time: {} };  

    // لو أول مرة يبدأ اللعبة
    if (!global.break.time[m.chat]) {
        global.break.time[m.chat] = Date.now();

        // ⏱️ نهاية اللعبة بعد 60 ثانية
        setTimeout(async () => {
            if (!global.break.scores[m.chat]) return;

            const entries = Object.entries(global.break.scores[m.chat])
                .sort((a, b) => b[1] - a[1]);

            if (!entries.length) {
                await conn.sendMessage(m.chat, { text: "⏰ انتهت اللعبة بدون فائز" });
                return;
            }

            const top = entries.slice(0, 3);

            let text = "🏆 *نتائج لعبة التفكيك*\n\n";
            const mentions = [];

            top.forEach(([id, score], i) => {
                mentions.push(id);

                let rewardXP = [150, 100, 50][i] || 0;
                let rewardMoney = [750, 500, 250][i] || 0;

                if (!global.db.users[id]) global.db.users[id] = {};

                global.db.users[id].xp = (global.db.users[id].xp || 0) + rewardXP;
                global.db.users[id].money = (global.db.users[id].money || 0) + rewardMoney;

                text += `${i+1}. @${id.split('@')[0]} - ${score} نقطة\n`;
                text += `   🎁 +${rewardXP} XP | +${rewardMoney} 💰\n\n`;
            });

            await conn.sendMessage(m.chat, {
                text,
                mentions
            });

            delete global.break.games[m.chat];
            delete global.break.scores[m.chat];
            delete global.break.time[m.chat];

        }, 60000);
    }

    if (global.break.games[m.chat]) {
        clearTimeout(global.break.games[m.chat].timeout);
        delete global.break.games[m.chat];
    }

    // ✅ قراءة من الملف بدل API
    const data = JSON.parse(fs.readFileSync(FILE));
    const q = data[Math.floor(Math.random() * data.length)];

    await m.reply(`  
╭─┈─┈─┈─⟞🔨⟝─┈─┈─┈─╮  
┃ *⌯︙ ${q.question}*  
╰─┈─┈─┈─⟞⚙️⟝─┈─┈─┈─╯  

> _فكك الكلمة بسرعة قبل إنتهاء الوقت_\n> وقت اللعبة: 60 ثانية ⏰`);

    if (!global.break.scores[m.chat]) global.break.scores[m.chat] = {};  

    global.break.games[m.chat] = {  
        answer: q.response,  
        timeout: setTimeout(() => {  
            if (global.break.games[m.chat]) {  
                delete global.break.games[m.chat];  
                m.reply(`⏰ انتهى الوقت\nالإجابة: ${q.response}`);
            }  
        }, 60000)  
    };  
}  

handler.usage = ["تفكيك"];  
handler.category = "games";  
handler.command = ['تفكيك'];  

export default handler;
