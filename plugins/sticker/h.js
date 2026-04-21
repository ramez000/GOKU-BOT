import { createSticker } from "../../system/utils.js";

const test = async (m, { conn, args }) => {
  if (!m.quoted) return m.reply("❤️ ~ يرجى الرد على ملصق ~ 💙");
  
  let [pack, author] = args.join(" ").split(" | ");
  
  if (!args.length) {
    return m.reply("📝 *الاستخدام الصحيح:*\n\n.حقوق اسم الباك | اسم المؤلف\n\n*مثال:*\n`.حقوق ramez | goku pack`");
  }
  
  if (!pack) pack = "𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉";
  if (author === undefined) author = null;
  
  const q = await m.quoted;
  
  const buffer = await createSticker(await q.download(), { mime: q.mimetype, pack, author });

  await conn.sendMessage(
    m.chat,
    { sticker: buffer, contextInfo: context(m.sender, "https://i.imgur.com/l8V677z.jpeg") },
    { quoted: global.reply_status }
  );
};

test.usage = ["حقوق نص | نص"];
test.command = ["حقوق"];
test.category = "sticker";
export default test;

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
