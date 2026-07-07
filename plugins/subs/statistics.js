const run = async (m, { conn, bot }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ نـظـام الـبـوتـات الـفـرعـيـة غير متاح");

  const stats = sub.stats();
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  const text = `📊⤿ إحـصـائـيـات الـبـوتـات الـفـرعـيـة 𑁍
⊱⋅ ──────────── ⋅⊰
📈 — المجموع: ${stats.total}
🟢 — متصل: ${stats.connected}
🔴 — غير متصل: ${stats.disconnected}
💬 — عدد الرسائل: ${stats.totalMessages}
⊱⋅ ──────────── ⋅⊰
⏱️ — مدة التشغيل: ${days} يوم ${hours} ساعة ${minutes} دقيقة
⊱⋅ ──────────── ⋅⊰
🆔 — البوت الرئيسي: ${bot.sock.user.id.split('@')[0]}
⊱⋅ ──────────── ⋅⊰
> *𝐆𝐨𝐤𝐮 | SubBot System*`;

  await m.reply(text);
};

run.command = ["احصائيات_البوتات"];
run.noSub = true;
run.usage =  ["احصائيات_البوتات"];
run.category = "sub";
export default run;
