let handler = async (m, {
    conn
}) => {
    try {
        m.reply(`𖤓° ┄─────────╮
🐲┊ *رابـــط الـــمـــجـــمـــوعـــة:* ${(await conn.groupMetadata(m.chat)).subject}
🐉┊
🐲┊ https://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat) + `
🐉┊
╰─────────┄ °𖤓`)
    } catch {
        const mentionedUser = conn.user.id.split(":")[0] + "@s.whatsapp.net";
        conn.sendMessage(m.chat, { 
            text: `𖤓° ┄──────────╮
🐲┊ يـــجـــب تـــعـــيـــيـــن @${mentionedUser.split('@')[0]} كـــمـــشـــرف لـــلـــتـــمـــكـــن مـــن اســـتـــخـــدام هـــذا الـــأمـــر!
╰──────────┄ °𖤓`, 
            mentions: [mentionedUser]
        })
    }
}
handler.usage = ["لينك"];
handler.category = "group";
handler.command = ["لينك", "link", "رابط" ,"الرابط"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
