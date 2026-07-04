async function handler(m, { conn, bot }) {
    const user = global.db?.users[m.sender] || {};
    const xp = user.xp || 0;
    const level = user.level || 0;
    const nameLevel = user.nameLevel || 'مبتدئ';
    const money = user.money || 0;
    const warnings = user.warnings || 0;
    const banned = user.banned || false;
    const premium = user.premium || false;
    const name = user.name || 'غير مسجل';
    const age = user.age || 'غير مسجل';
    
    const pushName = m.pushName || m.sender.split('@')[0];
    const phoneNumber = m.sender.split('@')[0];
    
    const nextLevelXp = (() => {
        const levels = [100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17500, 20000];
        return levels[level] || levels[levels.length - 1];
    })();
    
    const xpProgress = Math.min(100, Math.floor((xp / nextLevelXp) * 100));
    const status = banned ? '🚫 مـحـظـور' : (premium ? '👑 بـريـمـيـوم' : '🟢 عـادي');
    
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.imgur.com/ynstIpQ.jpeg');
    
    const msg = `╭─┈─┈─┈─⟞🐲⟝─┈─┈─┈─╮
┃ *📜 بـروفـايـل ${pushName} 📜*
╰─┈─┈─┈─⟞🐲⟝─┈─┈─┈─╯

┃ 📱 *الـرقـم:* ${phoneNumber}
┃ 🏷️ *الاسـم:* ${pushName}
┃ 📝 *الاسـم الـمـسـجـل:* ${name}
┃ 📅 *الـعـمـر:* ${age}
┃ 🏅 *الـرتـبة:* ${nameLevel}
┃ 📊 *الـمـسـتـوى:* ${level}
┃ ⭐ *الـنـقـاط:* ${xp} / ${nextLevelXp}
┃ 📈 *الـتـقـدم:* [${'⬜'.repeat(Math.floor(xpProgress / 10))}${'⬛'.repeat(10 - Math.floor(xpProgress / 10))}] ${xpProgress}%
┃ 💰 *الـفـلوس:* ${money}
┃ ⚠️ *الـتـحـذيـرات:* ${warnings}
┃ 🏷️ *الـحـالـة:* ${status}

╭─┈─┈─┈─⟞🐲⟝─┈─┈─┈─╮
┃ *𝑰'𝒍𝒍 𝒔𝒉𝒐𝒘 𝒚𝒐𝒖 𝒎𝒚 𝒕𝒓𝒖𝒆 𝒑𝒐𝒘𝒆𝒓!*🥋
╰─┈─┈─┈─⟞🐲⟝─┈─┈─┈─╯`;
    
    const cfg = bot.config.info;
    await conn.sendMessage(m.chat, {
        image: { url: profilePic },
        caption: msg,
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardingScore: 1,
            forwardedNewsletterMessageInfo: {
                newsletterJid: cfg.idChannel,
                newsletterName: cfg.nameChannel,
                serverMessageId: 0
            }
        }
    }, { quoted: reply_status });
}

handler.usage = ["بروفايل"];
handler.category = "bank";
handler.command = ["بروفايل", "profile", "my"];

export default handler;
