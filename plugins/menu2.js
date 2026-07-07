const CATEGORIES = [
    [1, '*قـسـم الــتــحــمــيــل*', 'downloads', '📥'],
    [2, '*قـسـم الــمــجــمــوعــات*', 'group', '👥'],
    [3, '*قـسـم الــمــلــصــقــات*', 'sticker', '💌'],
    [4, '*قـسـم الــمــطــوريــن*', 'owner', '👨‍💻'],
    [5, '*قـسـم الأدوات*', 'tools', '🛠'],
    [6, '*قـسـم المشرفين*', 'admin', '👨🏻‍⚖️'],
    [7, '*قـسـم الألــعــاب*', 'games', '🎮'],
    [8, '*قـسـم الــبــنــك*', 'bank', '💰'],
    [9, '*قـسـم الـبـوتـات الــفــرعــي*', 'sub', '🤖'],
    [10, '*مــعــلــومــات الــبــوت*', 'info', '📑'],
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

const getImg = (bot) => {
    const { images } = bot.config.info;
    return Array.isArray(images) ? images[Math.floor(Math.random() * images.length)] : images;
};

const context = (jid, img) => ({
    mentionedJid: [jid],
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
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

async function handler(m, { conn, bot, command, args }) {
    const selected = parseInt(args[0]);
    const now = new Date();
    const uptimeSeconds = process.uptime();
const hours = Math.floor(uptimeSeconds / 3600);
const minutes = Math.floor((uptimeSeconds % 3600) / 60);
const seconds = Math.floor(uptimeSeconds % 60);
const uptimeFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const date = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    if (!selected && !args[0]) {
        const sections = [{
            title: "",
            rows: CATEGORIES.map(c => ({
                title: `${c[0]} ~ ${c[1]} ${c[3]}`,
                description: `${c[1]}`,
                id: `.${command} ${c[0]}`
            }))
        }];

        const menuText = `
> *رَبَّنَا اغفِر لَنا وَلِإِخوانِنَا الَّذينَ سَبَقونا بِالإيمانِ وَلا تَجعَل في قُلوبِنا غِلًّا لِلَّذينَ آمَنوا رَبَّنا إِنَّكَ رَءوفٌ رَحيمٌ*

╭─┈─┈─┈─⟞🐲⟝─┈─┈─┈─╮
┃ ⌯👋︙ اهـلاً → *[ @${m.sender.split("@")[0]} ]*
┃ ⌯🚀︙ الـتشـغـيـل → ${uptimeFormatted}
┃ ⌯👾︙ الـتـاريـخ → ${date} - ${time}
╰─┈─┈─┈─⟞🎪⟝─┈─┈─┈─╯
> 💬 *رد على هذه الرسالة برقم القسم الذي تريده لعرض أوامره*`;
        
        await conn.sendButtonNormal(m.chat, {
            media: { url: "https://i.imgur.com/clDbZ1w.jpeg" },
            mediaType: 'image',
            caption: menuText,
            buttons: [{
                name: "single_select",
                params: {
                    title: "",
                    sections: sections
                }
            }],
            mentions: [m.sender],
            newsletter: {
                name: '𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉',
                jid: '120363409497248238@newsletter'
            }
        }, global.reply_status);
        return;
    }

    const cat = getCat(selected);
    if (!cat) {
        await conn.sendMessage(m.chat, { text: '*❌ اختار رقم صحيح من 1 لـ 15*', contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
        return;
    }

    const cmds = await bot.getAllCommands();
    const categoryCmds = cmds.filter(c => c.category === cat[2]);
    
    if (!categoryCmds.length) {
        await conn.sendMessage(m.chat, { text: '*❌ القسم فارغ*', contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
        return;
    }

    const cmdsList = categoryCmds.map(c => `${cat[3]} /${c.usage?.join(`\n${cat[3]} /`)}`).join('\n');

    await conn.sendMessage(m.chat, { text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قـسـم ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙RAMEZ ~ ${bot?.config?.info?.nameBot || 'POMNI-AI'}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯
> *رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا*`.trim(), contextInfo: context(m.sender, getImg(bot)) }, { quoted: m });
}

handler.command = ['المهام'];
export default handler;
