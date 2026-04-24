async function handler(m, { conn, bot, command, text }) {    
    if (!global.db?.users[m.sender]) global.db.users[m.sender] = {};    
    
    const user = global.db.users[m.sender];    
    
    // ===== التسجيل =====
    if (command === "تسجيل") {
        if (!text) {
            return m.reply(`*📝 طريقة التسجيل:*\n\nتسجيل الاسم|العمر\n\nمثال:\nتسجيل غوكو|20`);
        }

        const [name, age] = text.split('|').map(s => s.trim());

        if (!name || !age) {
            return m.reply(`*❌ لازم تكتب الاسم والعمر بهذا الشكل*\n\nمثال:\nتسجيل غوكو|20`);
        }

        if (isNaN(age) || age < 1 || age > 40) {
            return m.reply(`*❌ العمر لازم يكون رقم بين 1 و 40*`);
        }

        user.name = name;
        user.age = parseInt(age);

        return m.reply(`✅ تم تسجيلك:\n${name} | ${age}`);
    }

    if (command === "حذف_تسجيلي") {
        delete user.name;
        delete user.age;
        return m.reply("✅ تم حذف تسجيلك");
    }

    // ===== البروفايل =====
    const xp = user.xp || 0;    
    const level = user.level || 0;    
    const nameLevel = user.nameLevel || 'مبتدئ';    
    const money = user.money || 0;    
    const warnings = user.warnings || 0;    
    const banned = user.banned || false;    
    const premium = user.premium || false;    
    const name = user.name || 'غير مسجل';    
    const age = user.age || 'غير مسجل';    
        
    const pushName = m.pushName || m.sender.split('@')[0];    
    const phoneNumber = m.sender.split('@')[0];    
        
    const nextLevelXp = (() => {    
        const levels = [100,250,500,800,1200,1700,2300,3000,3800,4700,5700,6800,8000,9300,10700,12200,13800,15500,17500,20000];    
        return levels[level] || levels[levels.length - 1];    
    })();    
        
    const xpProgress = Math.min(100, Math.floor((xp / nextLevelXp) * 100));    
    const status = banned ? '🚫 محظور' : (premium ? '👑 بريميوم' : '🟢 عادي');    
        
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.imgur.com/6Iej2c3.png');    
        
    const msg = `╭─┈─┈─⟞🐉⟝─┈─┈─╮    
┃ *📒 بروفايل ${pushName}*    
╰─┈─┈─⟞🐉⟝─┈─┈─╯    

┃ 📱 الرقم: ${phoneNumber}    
┃ 🏷️ الاسم: ${pushName}    
┃ 📝 المسجل: ${name}    
┃ 📅 العمر: ${age}    
┃ 🎭 اللقب: ${nameLevel}    
┃ 📊 المستوى: ${level}    
┃ ⭐ النقاط: ${xp}/${nextLevelXp}    
┃ 📈 التقدم: ${xpProgress}%    
┃ 💰 الفلوس: ${money}    
┃ ⚠️ التحذيرات: ${warnings}    
┃ 🏷️ الحالة: ${status}    

> *╭─┈─┈─⟞🐉⟝─┈─┈─╮*  
> *┃ 𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉🤖*  
> *╰─┈─┈─⟞🐉⟝─┈─┈─╯*`;    
        
    await conn.sendMessage(m.chat, {    
        image: { url: profilePic },    
        caption: msg,    
        contextInfo: { mentionedJid: [m.sender] }    
    }, { quoted: m });    
}    

handler.usage = ["بروفايل","تسجيل","حذف_تسجيلي"];    
handler.category = "bank";    
handler.command = ["بروفايل","profile","my","تسجيل","حذف_تسجيلي"];    

export default handler;
