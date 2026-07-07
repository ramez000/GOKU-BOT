const run = async (m, { conn, bot, args, text }) => {
  const sub = global.subBots;
  if (!sub) return m.reply("❌ نـظـام الـبـوتـات الـفـرعـيـة غير متاح");
  if (!text) return m.reply(`~ اعمل متابعة لقناة مثال: \n- .متابعة https://whatsapp.com/channel/0029Vb8BJTC8KMqfvzu1an0K`);

  const urlParts = text.trim().split("/");
  const channelInvite = urlParts[urlParts.length - 1];
  if (!channelInvite) return m.reply("❌~ الرابط ليس صحيح");

  let channelJid;
  try {
    const metadata = await conn.newsletterMetadata("invite", channelInvite);
    channelJid = metadata.id;
  } catch (err) {
    return m.reply(`❌~ لا أستطيع الوصول للقناة`);
  }

  const res = (await sub.list()).filter(b => b.connected && b.phone && b.id !== bot.id);
  if (res.length === 0) return m.reply("❌~ لا توجد بوتات فرعية متصلة");

  const ids = [];
  const loadingMsg = await conn.sendMessage(m.chat, {
    text: "```⏳ جـاري عـمـل متابعة للقناة...```"
  }, { quoted: global.reply_status });

  for (const bots of res) {
    try {
      const subBot = await sub.get(bots.id);
      await subBot.sock.newsletterFollow(channelJid);
      ids.push(bots.id);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {}
  }
  
  await conn.sendMessage(m.chat, {
    text: `✅ — تم عمل متابعة للقناة بواسطة ${ids.length} بوت فرعي`,
    edit: loadingMsg.key
  });
};

run.command = ["متابعة"];
run.noSub = true;
run.owner = true;
run.usage = ["متابعة"];
run.category = "sub";
export default run;
