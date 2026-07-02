const handler = async (m, { conn, text }) => {
    if (!m.isGroup) return m.reply("هذا الأمر يستخدم في المجموعات فقط ❌");

    const participants = (await conn.groupMetadata(m.chat)).participants;

    const mentions = participants.map(v => v.id);

    await conn.sendMessage(m.chat, {
        text: text || "‎",
        mentions
    });
};

handler.command = ["مخفي"];
handler.usage = ["مخفي"];
handler.category = "group";
handler.admin = true;
handler.group = true;

export default handler;
