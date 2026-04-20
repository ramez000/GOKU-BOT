const handler = async (m, { conn }) => {
  const start = process.hrtime.bigint();
  await conn.sendMessage(m.chat, { text: "🏓 msg test" });
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  await conn.msgUrl(m.chat, `⚡ سرعة البوت: ${ping.toFixed(2)}ms`, {
    img: "https://i.imgur.com/ldX0PhE.jpeg",
    title: "",
    body: "",
    newsletter: {
      name: '',
      jid: ''
    },
    big: false
  }, global.reply_status);
};

handler.command = ["بنج", "ping"];
handler.category = "info";
handler.usage = ["بنج"];
export default handler;
