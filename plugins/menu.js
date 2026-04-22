const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, '*الــتــحــمــيــل*', 'downloads', '📂'],
    [2, '*الــمــجــمــوعــات*', 'group', '👥'],
    [3, '*الــمــلــصــقــات*', 'sticker', '💌'],
    [4, '*الــمــطــوريــن*', 'owner', '👨‍💻'],
    [5, '*الادمـــن*', 'admin', '👨🏻‍⚖️'],
    [6, '*الالــعــاب*', 'games', '🎮'],
    [7, '*الــصــور*', 'pictures', '🖼'],
    [8, '*الــبــنــك*', 'bank', '💰'],
    [9, '*الـبـوتـات الــفــرعــي*', 'sub', '📲'],
    [10, '*مــعــلــومــات الــبــوت*', 'info', '📑'],
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
╭━━━━━━━━━━━━━━╮
┃ 🌟 *قــائــمـة الأوامـــر* 🌟
╰━━━━━━━━━━━━━━╯

> *رَبَّنا وَلا تُحَمِّلنا ما لا طاقَةَ لَنا بِهِ*

${CATEGORIES.map(c => `➤ ${c[0]} │ ${c[3]} ${c[1]}`).join('\n')}

> *رَبَّنَا اغفِر لَنا وَلِإِخوانِنَا الَّذينَ سَبَقونا بِالإيمانِ وَلا تَجعَل في قُلوبِنا غِلًّا لِلَّذينَ آمَنوا رَبَّنا إِنَّكَ رَءوفٌ رَحيمٌ*

━━━━━━━━━━━━━━━
💬 *أرسل رقم القسم لعرض أوامره*

> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*
> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*
> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*
`.trim();

    const msg = await conn.sendMessage(m.chat, {
    image: { url: 'https://i.imgur.com/clDbZ1w.jpeg' },
    caption: ''
});

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
