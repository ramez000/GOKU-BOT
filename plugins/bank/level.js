export default async function before(m, { conn }) {
    if (!global.db?.users[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || 'جندي';
    
    const levels = [
        { min: 0, max: 99, name: 'جندي' },
        { min: 100, max: 249, name: 'جندي أول' },
        { min: 250, max: 499, name: 'عرّيف' },
        { min: 500, max: 799, name: 'وكيل عرّيف' },
        { min: 800, max: 1199, name: 'رقيب' },
        { min: 1200, max: 1699, name: 'رقيب أول' },
        { min: 1700, max: 2299, name: 'مساعد' },
        { min: 2300, max: 2999, name: 'مساعد أول' },
        { min: 3000, max: 3799, name: 'وكيل ضابط' },
        { min: 3800, max: 4699, name: 'ملازم' },
        { min: 4700, max: 5699, name: 'ملازم أول' },
        { min: 5700, max: 6799, name: 'نقيب' },
        { min: 6800, max: 7999, name: 'رائد' },
        { min: 8000, max: 9299, name: 'مقدم' },
        { min: 9300, max: 10699, name: 'عقيد' },
        { min: 10700, max: 12199, name: 'عميد' },
        { min: 12200, max: 13799, name: 'لواء' },
        { min: 13800, max: 15499, name: 'فريق' },
        { min: 17500, max: 19999, name: 'فريق أول' },
        { min: 20000, max: Infinity, name: 'قائد' }
    ];
    
    let newLevel = level;
    let newNameLevel = nameLevel;
    let levelUp = false;
    let oldLevel = level;
    
    for (const lvl of levels) {
        if (xp >= lvl.min && xp <= lvl.max) {
            const currentLevelNum = levels.findIndex(l => l.min === lvl.min);
            if (currentLevelNum !== level) {
                newLevel = currentLevelNum;
                newNameLevel = lvl.name;
                levelUp = true;
                oldLevel = level;
            }
            break;
        }
    }
    
    if (levelUp) {
        user.level = newLevel;
        user.nameLevel = newNameLevel;
        
        const msg = `╭─┈─┈─┈─⟞🐉⟝─┈─┈─┈─╮
┃ *🌟 تم بلوغ مستوى جديد 🌟*
╰─┈─┈─┈─⟞🐉⟝─┈─┈─┈─╯

┃ @${m.sender.split('@')[0]}
┃ المستوى السابق: *${oldLevel}*
┃ المستوى الجديد: *${newLevel}*

┃ 🏷️ *لقبك الجديد:*
┃ ✦ ${newNameLevel} ✦

> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*
> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*
> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*`,      
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: '',
                    serverMessageId: 0
                },
                externalAdReply: {
                    title: "",
                    body: "",
                    thumbnailUrl: " https://i.imgur.com/clDbZ1w.jpeg",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: reply_status });
    }
    
    return false;
}
