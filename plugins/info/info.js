import os from 'os';

const handler = async (m, { conn, bot, config }) => {
  const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
  const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
  const heapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1);
  const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
  const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
  const cpuCores = os.cpus().length;
  const cpuModel = os.cpus()[0].model;
  const cpuSpeed = (os.cpus()[0].speed / 1000).toFixed(1);
  const cpuUsage = (os.loadavg()[0] * 100).toFixed(1);
  const platform = os.platform();
  const arch = os.arch();
  const hostname = os.hostname();
  const uptime = process.uptime();
  const uptimeHours = Math.floor(uptime / 3600);
  const uptimeMins = Math.floor((uptime % 3600) / 60);
  const uptimeSecs = Math.floor(uptime % 60);
  
  const groups = await conn.groupFetchAllParticipating();
  const groupCount = Object.values(groups).length;
  
  const subBots = global.subBots;
  const subCount = subBots?.list().length || 0;
  const subConnected = subBots?.list().filter(b => b.connected).length || 0;
  
  const msg = `
——> *الـبـوت 🤖*
- *الاسم:* \`${conn.user.name || bot.config.info.nameBot || "User"}\`
- *الرقم:* \`wa.me/+${conn.user.id.split(':')[0]}\`
- *تم التشغيل منذ:* \`${uptimeHours.toString().padStart(2, '0')}:${uptimeMins.toString().padStart(2, '0')}:${uptimeSecs.toString().padStart(2, '0')}\`

——> *الـنـظـام 💻*
- *النظام:* \`${platform} ${arch}\`
- *الجهاز:* \`${hostname}\`
- *المعالج:* \`${cpuModel.slice(0, 30)}...\`
- *النوى:* \`${cpuCores} نواة @ ${cpuSpeed}GHz\`
- *الحمل:* \`${cpuUsage}%\`

——> *الـذاكـرة 🧠*
- *الرام المستخدم:* \`${usedRam}MB / ${totalRam}GB\`
- *الرام الفارغ:* \`${freeRam}GB\`
- *Heap:* \`${heapUsed}MB / ${heapTotal}MB\`

——> *احـصـائـيـات 📊*
- *المجموعات:* \`${groupCount}\`

——> *الـبـوتـات الـفـرعـيـه 📲*
- *الإجمالي:* \`${subCount}\`
- *المتصل:* \`${subConnected}\`
- *المنفصل:* \`${subCount - subConnected}\`

——> *الـمـالـكـيـن 👑*
- *العدد:* \`${bot.owners?.length || 0}\`
- *الرئيسي:* \`${bot.owners?.[0]?.name || '𝑹𝑨𝑴𝑬𝒁'} (${bot.owners?.[0]?.jid?.split('@')[0] || 'لا يوجد'})\`

> *_𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉 𝑺𝒀𝑺𝑻𝑬𝑴_*`;

  await conn.sendMessage(m.chat, {
    text: msg,
    contextInfo: context(m.sender, "https://i.imgur.com/clDbZ1w.jpeg") }, { quoted: reply_status });
};

handler.command = ["معلومات", "info", "botinfo", "حالة"];
handler.category = "info";
handler.usage = ["معلومات"];
export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '',
        newsletterName: '',
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
