const rewards = {  
    daily: { xp: 100, money: 200, cooldown: 86400000, name: 'يومي' },  
    weekly: { xp: 500, money: 800, cooldown: 604800000, name: 'اسبوعي' },  
    monthly: { xp: 2000, money: 3000, cooldown: 2592000000, name: 'شهري' }  
};  

const handler = async (m, { conn, command }) => {  
    const type = command === 'يومي' ? 'daily' : command === 'اسبوعي' ? 'weekly' : 'monthly';  
    const reward = rewards[type];  

    const user = global.db.users[m.sender] ||= {};  
    user.time ||= {};  

    const last = user.time[type];  
    const now = Date.now();  

    if (last && now - last < reward.cooldown) {  
        return m.reply("❌ ما خلص الوقت");  
    }  

    user.time[type] = now;  
    user.xp = (user.xp || 0) + reward.xp;  
    user.money = (user.money || 0) + reward.money;  

    m.reply(`🎁 حصلت على:\n+${reward.xp} XP\n+${reward.money} فلوس`);
};  

handler.command = ["يومي","اسبوعي","شهري"];
export default handler;
