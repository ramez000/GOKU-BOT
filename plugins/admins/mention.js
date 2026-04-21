import fs from 'fs';

const FILE = './system/titles.json';

// قراءة البيانات
const loadTitles = () => {
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '{}');
    return JSON.parse(fs.readFileSync(FILE));
};

// حفظ البيانات
const saveTitles = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

const handler = async (m, { conn }) => {

let titles = loadTitles();


// ===== أمر التسجيل =====
if (m.text.startsWith('.تسجيل')) {
    let mentioned = m.mentionedJid[0];
    if (!mentioned) return m.reply("❌ قم بعمل منشن للشخص");

    let text = m.text.replace('.تسجيل', '').trim();
    if (!text.includes('|')) return m.reply("❌ استخدم الشكل: اسم|رتبة");

    titles[mentioned] = text;
    saveTitles(titles);

    return m.reply(`✅ تم تسجيل:\n@${mentioned.split('@')[0]}\n${text}`, null, {
        mentions: [mentioned]
    });
}


// ===== المنشن =====
const metadata = await conn.groupMetadata(m.chat);
const participants = metadata.participants;

const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
const groupMembers = participants.filter(p => !p.admin).map(p => p.id);

const shuffledAdmins = [...groupAdmins].sort(() => Math.random() - 0.5);
const shuffledMembers = [...groupMembers].sort(() => Math.random() - 0.5);

let messageText = "";
messageText += `╭━━━━━━━━━━━━━━━╮\n`;
messageText += `┃ 📛 ${metadata.subject}\n`;
messageText += `╰━━━━━━━━━━━━━━━╯\n`;
messageText += `📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n\n`;


// ===== المشرفين =====
messageText += `👑 *المشرفون (${shuffledAdmins.length})*\n`;
messageText += "━━━━━━━━━━━━━━━\n";

shuffledAdmins.forEach((admin, index) => {
    let title = titles[admin] || "غير مسجل";
    messageText += `👨‍⚖️ ${index + 1}. @${admin.split('@')[0]}\n`;
    messageText += `   └ ${title}\n\n`;
});


// ===== الأعضاء =====
messageText += `👥 *الأعضاء (${shuffledMembers.length})*\n`;
messageText += "━━━━━━━━━━━━━━━\n";

shuffledMembers.forEach((member, index) => {
    let title = titles[member] || "غير مسجل";
    messageText += `🔹 ${index + 1}. @${member.split('@')[0]}\n`;
    messageText += `   └ ${title}\n\n`;
});

messageText += `━━━━━━━━━━━━━━━\n`;
messageText += `📊 إجمالي الأعضاء: ${participants.length}\n\n`;

messageText += `> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*\n`;
messageText += `> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*\n`;
messageText += `> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*`;

return conn.sendMessage(m.chat, { 
    text: messageText, 
    mentions: participants.map(p => p.id)
});
};

handler.usage = ["منشن", "تسجيل"];
handler.category = "admin";
handler.command = ["منشن", "منشنز", "mention", "تسجيل"];
handler.admin = true;

export default handler;
