const handler = async (m, { conn, args }) => {
const metadata = await conn.groupMetadata(m.chat);
const participants = metadata.participants;
const groupAdmins = participants.filter(p => p.admin).map(p => p.id);
const groupMembers = participants.filter(p => !p.admin).map(p => p.id);

const shuffledAdmins = [...groupAdmins].sort(() => Math.random() - 0.5);
const shuffledMembers = [...groupMembers].sort(() => Math.random() - 0.5);

let messageText = "";
messageText += `🗃️│ الـاســم: ${metadata.subject}\n`;
messageText += `📯│ تـاريـخ: ${new Date().toLocaleDateString('ar-EG')}\n\n`;


messageText += `↓👑 *الـمـشـرفـيـن (${shuffledAdmins.length})* 👑↓\n`;
messageText += "```───────────────────\n";
shuffledAdmins.forEach((admin, index) => {
    messageText += `👨‍⚖️│ ${index + 1}. @${admin.split('@')[0]}\n`;
});
messageText += "───────────────────```\n\n";

messageText += `↓👥 *الاعـضـاء (${shuffledMembers.length})* 👥↓\n`;
messageText += "```───────────────────\n";
shuffledMembers.forEach((member, index) => {
    messageText += `│ ${index + 1}. @${member.split('@')[0]}\n`;
});
messageText += "───────────────────```\n\n";

messageText += `> *إجمالي المشاركين — ${participants.length}*`;

messageText += `> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*`
messageText += `> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*`
messageText += `> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*`,
    
return conn.sendMessage(m.chat, { 
    text: messageText, 
    mentions: participants.map(p => p.id)
});
};

handler.usage = ["منشن"]
handler.category = "admin";
handler.command = ["منشن" ,"منشنز", "mention", "الكل"];
handler.admin = true;

export default handler;
