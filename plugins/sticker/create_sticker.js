import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, args }) => {
  if (!m.quoted) return m.reply("❤️ ~ يرجى الرد على ملصق ~ 💙");

  const pack = args.join(" ") || "RAMEZ";
  
  if (!args.length) {
    return m.reply("📝 *الاستخدام الصحيح:*\n\n.حقوق اسم الباك\n\n*مثال:*\n`.حقوق Goku`");
  }
  
  const q = await m.quoted;
  
  const buffer = await createSticker(await q.download(), { mime: q.mimetype, pack });

  await conn.sendMessage(
    m.chat,
    { sticker: buffer, contextInfo: context(m.sender, "https://i.imgur.com/YcMIELK.jpeg") },
    { quoted: global.reply_status }
  );
};

test.usage = ["حقوق"];
test.command = ["حقوق"];
test.category = "sticker";
export default test;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363409497248238@newsletter',
        newsletterName: '𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉',
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
