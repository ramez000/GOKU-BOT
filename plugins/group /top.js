const handler = async (m, { conn }) => {    
const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);    
const jids = participants.map(p => p.id);    

if (jids.length < 2) {    
    return conn.sendMessage(m.chat, { text: "❌ عدد أعضاء المجموعة قليل جداً" });    
}    

// جلب التفاعل (من قاعدة البيانات)
const usersData = jids.map(id => {
    let user = global.db?.users?.[id] || {};
    return {
        id,
        score: user.exp || user.messages || 0
    };
});

// ترتيب حسب التفاعل
const sortedUsers = usersData
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

let messageText = `
╭━━━━━━━━━━━━━━━╮
┃ 📊*Top 10 most active*
╰━━━━━━━━━━━━━━━╯

🔥 أكثر الأعضاء نشاطاً في المجموعة:

`;

sortedUsers.forEach((user, index) => {    
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🔹";    
    messageText += `${medal} *${index + 1}.* @${user.id.split('@')[0]}\n`;
    messageText += `   └ 💬 عدد التفاعل: *${user.score}*\n\n`;
});    

messageText += `
> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*
> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*
> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*
`;

return conn.sendMessage(m.chat, {     
    text: messageText,     
    mentions: sortedUsers.map(u => u.id)     
});    
};    

handler.usage = ["توب"];    
handler.category = "group";    
handler.command = ["توب"];    

export default handler;
