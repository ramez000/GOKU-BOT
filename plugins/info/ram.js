import os from 'os';

const handler = async (m, { conn }) => {
  const txt = `
  ⊱⋅ ────────────────── ⋅⊰
🪾╎ الـمسـتـخـدم: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)}MB
🌳╎ الـمتـبــقـي: ${(os.freemem() / 1024 / 1024).toFixed(1)}MB
  ⊱⋅ ────────────────── ⋅⊰
`;

  await conn.msgUrl(m.chat, txt, {
    img: "https://i.imgur.com/KN88phP.jpeg" ,
    caption: txt,
    title: "",
    body: "",
    newsletter: {
      name: '𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉',
      jid: '120363409497248238@newsletter'
    },
    big: false,
    mentions: [m.sender]
  }, global.reply_status);
};

handler.command = ["الرام", "ram"];
handler.category = "info";
handler.usage = ["الرام", "ram"];
export default handler;
