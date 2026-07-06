handler.before = async (m, { conn }) => {
    if (!m.text || !global.quiz?.games[m.chat] || !global.quiz?.scores[m.chat]) return;

    const game = global.quiz.games[m.chat];
    const player = m.sender;
    
    if (m.text.trim() !== game.answer) return;

    clearTimeout(game.timeout);
    delete global.quiz.games[m.chat];

    if (!global.quiz.scores[m.chat][player]) global.quiz.scores[m.chat][player] = 0;
    global.quiz.scores[m.chat][player]++;
    
    let total = 0;
    for (let id in global.quiz.scores[m.chat]) {
        total += global.quiz.scores[m.chat][id];
    }
    
    if (total >= 20) {
        const entries = Object.entries(global.quiz.scores[m.chat])
            .sort((a, b) => b[1] - a[1]);
        
        const sorted = entries.map(([id, score], i) => 
            `${i+1}. @${id.split('@')[0]} - ${score} نقطة`
        );
        
        const mentions = entries.map(([id]) => id);
        
        const winner = entries[0][0];
        if (global.db?.users[winner]) {
            global.db.users[winner].xp = (global.db.users[winner].xp || 0) + 450;
            global.db.users[winner].money = (global.db.users[winner].money || 0) + 10;
        }
        
        await conn.sendMessage(m.chat, { 
            text: `🏆 *الفائزون*\n\n${sorted.join('\n')}\n\n🏅 @${winner.split('@')[0]} حصل على +450 XP و 💵 +10 فلوس`,
            mentions
        });
        delete global.quiz.scores[m.chat];
        return;
    }

    await m.reply(`✅ احسنت تستاهل: ${global.quiz.scores[m.chat][player]} نقطة`);
    handler(m, { conn });
};

async function handler(m, { conn }) {
    if (!global.quiz) global.quiz = { games: {}, scores: {} };

    if (global.quiz.games[m.chat]) {
        clearTimeout(global.quiz.games[m.chat].timeout);
        delete global.quiz.games[m.chat];
    }

    const data = await (await fetch("https://raw.githubusercontent.com/ramez000/GOKU-BOT/main/Files/JSON/GOKU-كتابة.json")).json();
    const q = data[Math.floor(Math.random() * data.length)];
    
    m.reply(`
╭─┈─┈─┈─⟞🖊⟝─┈─┈─┈─╮
┃ *⌯︙ ${q.question}*
╰─┈─┈─┈─⟞📝⟝─┈─┈─┈─╯
> *أكتب نفس الكلمة بسرعة قبل إنتهاء الوقت*`);
    
    if (!global.quiz.scores[m.chat]) global.quiz.scores[m.chat] = {};
    
    global.quiz.games[m.chat] = {
        answer: q.response,
        timeout: setTimeout(() => {
            if (global.quiz.games[m.chat]) {
                delete global.quiz.games[m.chat];
                delete global.quiz.scores[m.chat];
                m.reply("`⏰: انتهى الوقت`");
            }
        }, 30000)
    };
}

handler.usage = ["كتابة"];
handler.category = "write";
handler.command = ['كتابة'];
export default handler;
