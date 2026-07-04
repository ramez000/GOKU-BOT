export default async function before(m, { conn }) {
    if (!global.db?.users[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || 'مبتدئ';
    
    const levels = [
        { min: 0, max: 99, name: 'مبتدئ' },
        { min: 100, max: 249, name: 'متدرب' },
        { min: 250, max: 499, name: 'ناشئ' },
        { min: 500, max: 799, name: 'مجتهد' },
        { min: 800, max: 1199, name: 'متمرس' },
        { min: 1200, max: 1699, name: 'متمكن' },
        { min: 1700, max: 2299, name: 'محترف' },
        { min: 2300, max: 2999, name: 'بارع' },
        { min: 3000, max: 3799, name: 'خبير' },
        { min: 3800, max: 4699, name: 'متميز' },
        { min: 4700, max: 5699, name: 'رائد' },
        { min: 5700, max: 6799, name: 'قائد' },
        { min: 6800, max: 7999, name: 'زعيم' },
        { min: 8000, max: 9299, name: 'عملاق' },
        { min: 9300, max: 10699, name: 'فريد' },
        { min: 10700, max: 12199, name: 'سيد النخبة' },
        { min: 12200, max: 13799, name: 'أسطوري' },
        { min: 13800, max: 15499, name: 'خارق' },
        { min: 15500, max: 17499, name: 'سوبر سايان' },
        { min: 20000, max: Infinity, name: '🌀 نخبوي' }
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
        
        const msg = `╭─┈─┈─┈─⟞🎪⟝─┈─┈─┈─╮
┃ *🎭 تـرقـيـة فـي الـسـيـرك 🎪*
╰─┈─┈─┈─⟞🎭⟝─┈─┈─┈─╯

┃ @${m.sender.split('@')[0]}
┃ المستوى السابق: *${oldLevel}*
┃ المستوى الجديد: *${newLevel}*

┃ 🏷️ *لقبك الجديد:*
┃ ✦ ${newNameLevel} ✦

╭─┈─┈─┈─⟞🎭⟝─┈─┈─┈─╮
┃ *العرض لسه مخلصش يا بطل* 🎪
╰─┈─┈─┈─⟞🤡⟝─┈─┈─┈─╯`;
        
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363409497248238@newsletter',
                    newsletterName: '𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉',
                    serverMessageId: 0
                },
                externalAdReply: {
                    title: "",
                    body: "",
                    thumbnailUrl: "",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: reply_status });
    }
    
    return false;
                  }
