async function handler(m, { conn }) {
    if (!global.gameActive) global.gameActive = {};
    
    if (global.gameActive[m.chat]) {
        clearTimeout(global.gameActive[m.chat].timeout);
        delete global.gameActive[m.chat];
    }
    
    const res = await fetch("https://raw.githubusercontent.com/ramez000/GOKU-BOT/main/Files/JSON/GOKU-علم.json");
    const data = await res.json();
    const country = data[Math.floor(Math.random() * data.length)];
    
    const msg = await conn.sendMessage(m.chat, {
        image: { url: country.img },
        caption: "🌍 *خمن العلم*\n\nلديك 30 ثانية للإجابة رد على الرسالة بإسم العلم"
    });
    
    global.gameActive[m.chat] = {
        answer: country.name.toLowerCase(),
        image: country.img,
        msgId: msg.key.id,
        timeout: setTimeout(() => {
            if (global.gameActive[m.chat]) {
                const answer = global.gameActive[m.chat].answer;
                delete global.gameActive[m.chat];
                conn.sendMessage(m.chat, { text: `⏰ *أنتهى الوقت* الإجابة هي : *${answer}*` });
            }
        }, 30000)
    };
}

handler.before = async (m, { conn }) => {
    if (!m.quoted || !m.text) return;
    if (!global.gameActive?.[m.chat]) return;
    
    const game = global.gameActive[m.chat];
    if (m.quoted.id !== game.msgId) return;
    
    if (m.text.toLowerCase().trim() === game.answer) {
        clearTimeout(game.timeout);
        delete global.gameActive[m.chat];
        
        if (global.db?.users[m.sender]) {
            global.db.users[m.sender].xp = (global.db.users[m.sender].xp || 0) + 150;
            global.db.users[m.sender].money = (global.db.users[m.sender].money || 0) + 4;
        }
        
        await conn.sendMessage(m.chat, {
            image: { url: game.image },
            caption: `🎉 *صحيح صحيح* ممتاز إسم العلم صحيح *150XP & 4 money*\n💡 أكمل باقي الإجابات بشكل صحيح لتفوز باللعبة\n\n> اكتب *${m.prefix || '.'} *اكتب:⦉ .علم ⦊ لتلعب مجدداً`
        });
        return true;
    }
    
    await m.reply("*❌ إجابة خاطئة حاول مجدداً*");
    return true;
};

handler.usage = ["علم"];
handler.category = "games";
handler.command = ['علم', 'country'];

export default handler;
