const cooldown = new Map();

const handler = async (m, { conn }) => {
    const target = m.mentionedJid?.[0];
    
    if (!target) return m.reply("❌ منشن الشخص");
    if (target === m.sender) return m.reply("❌ ما ممكن تسرق نفسك");
    
    const userTarget = global.db.users[target];
    const userSender = global.db.users[m.sender];
    
    if (!userTarget?.money) return m.reply("❌ هذا العضو ما عنده فلوس أصلاً");
    if (userTarget.money < 100) return m.reply("❌ فقير جداً");
    
    const now = Date.now();
    if (cooldown.get(m.sender) > now) {
        return m.reply("⏳ انتظر شوي قبل ما تسرق مرة ثانية");
    }
    
    cooldown.set(m.sender, now + 3600000);
    
    const amount = Math.floor(Math.random() * 500) + 100;
    const success = Math.random() < 0.7;
    
    if (!success) {
        const loss = Math.floor(amount / 2);
        userSender.money = Math.max(0, (userSender.money || 0) - loss);
        
        return conn.sendMessage(m.chat, {
            text: `❌ فشلت السرقة\nخسرت ${loss} فلوس`,
            mentions: [m.sender]
        });
    }
    
    const steal = Math.min(amount, userTarget.money);
    
    userTarget.money -= steal;
    userSender.money = (userSender.money || 0) + steal;
    
    return conn.sendMessage(m.chat, {
        text: `💰 نجحت السرقة\nسرقت ${steal} فلوس`,
        mentions: [m.sender, target]
    });
};

handler.command = ["سرقة"];
handler.category = "games";

export default handler;
