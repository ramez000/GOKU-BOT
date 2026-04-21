const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, 'التـحـمـيـل', 'downloads', '📂'],
    [2, 'الـمـجـمـوعـات', 'group', '👥'],
    [3, 'الـمـلـصـقـات', 'sticker', '💌'],
    [4, 'الـمـطـوريـن', 'owner', '👨‍💻'],
    [5, 'امـثـلـه', 'example', '✳️'],
    [6, 'الـادوات', 'tools', '🚀'],
    [7, 'الـبـحـث', 'search', '🌐'],
    [8, 'الادمــن', 'admin', '👨🏻‍⚖️'],
    [9, 'الالــعـاب', 'games', '🎮'],
    [10, 'الچيف', 'gif', '🖼'],
    [11, 'الـبــنـك', 'bank', '💰'],
    [12, 'الـذكـاء الاصـطـنـاعـي', 'ai', '🤖'],
    [13, 'الـبـوتـات الـفـرعـي', 'sub', '📲'],
    [14, 'مـعـلومـات الـبـوت', 'info', '📑'],
    [15, 'أخــرى', 'other', '📚']
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

if (!global.menus) global.menus = {};

const clean = () => {
    const now = Date.now();
    Object.keys(global.menus).forEach(k => {
        if (now - global.menus[k].time > MENU_TIMEOUT) delete global.menus[k];
    });
};

const menu = async (m, { conn }) => {
    clean();

    const text = `
╭━━━━━━━━━━━━━━━╮
┃ 🌟 *قــائــمـة الأوامـــر* 🌟
╰━━━━━━━━━━━━━━━╯

> *رَبَّنا وَلا تُحَمِّلنا ما لا طاقَةَ لَنا بِهِ*

${CATEGORIES.map(c => `➤ ${c[0]} │ ${c[3]} ${c[1]}`).join('\n')}

> *رَبَّنَا اغفِر لَنا وَلِإِخوانِنَا الَّذينَ سَبَقونا بِالإيمانِ وَلا تَجعَل في قُلوبِنا غِلًّا لِلَّذينَ آمَنوا رَبَّنا إِنَّكَ رَءوفٌ رَحيمٌ*

━━━━━━━━━━━━━━━
📌 *أرسل رقم القسم لعرض أوامره*

> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*
> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*
> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*
`.trim();

    const msg = await conn.sendMessage(m.chat, { text });

    global.menus[msg.key.id] = {
        chatId: m.chat,
        time: Date.now()
    };
};

menu.before = async (m, { conn }) => {
    clean();

    const data = global.menus[m.quoted?.id];
    if (!data) return false;

    const cat = getCat(parseInt(m.text));
    if (!cat) {
        await conn.sendMessage(m.chat, {
            text: "❌ اختر رقم صحيح من القائمة"
        });
        return true;
    }

    await conn.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,
            id: m.quoted.id,
            fromMe: true
        }
    });

    delete global.menus[m.quoted.id];

    const section = await import('./sections.js');
    return section.default(m, { conn, args: [cat[2]] });
};

menu.command = ['الاوامر', 'القائمة', 'menu', 'اوامر'];

export default menu;
