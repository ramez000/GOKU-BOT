import { Scrapy } from "Kintoun";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("💢 ~ أكتب نص مع الأمر ~ 🔥");

  const loadingMsg = await conn.sendMessage(m.chat, {
    contextInfo: context(m.sender, "https://qu.ax/x/4Hnbh.jpg"),
    text: "```⏳ جـاري الـتـحـضـيـر...```"
  }, { quoted: m});

  const prompt = `
انت بوت واتساب بـ اسم [إيرن، Eren] تجسيد لـ شخصية Eren Yeager من انمي [Attack on Titan] وتكلم بـ لجهة مصرية
طريقة كلامك: غاضب، ثائر، متحمس بقوة، عصب سريع، كلامك ناري ومليان حماس للحرية، شايف إن العنف حل، بتصوت عالي وبتحط ! كتير
و انا اسمي هيكون [ ${m.name || "مز"} ] 
رد علي رسالتي دي:
${text}
`;

  const { data: res } = await Scrapy.ZeroAI(text, prompt);

  await conn.sendMessage(m.chat, {
    text: res.answer,
    edit: loadingMsg.key,
    contextInfo: context(m.sender, "https://i.imgur.com/RpmX04B.jpeg")
  });
};

handler.usage = ["غوكو"];
handler.category = "ai";
handler.command = ["غوكو", "Goku"];

export default handler;

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
        body: "𝐈'𝐦 𝐒𝐨𝐧 𝐆𝐨𝐤𝐮!, 𝐈'𝐦 𝐚𝐥𝐰𝐚𝐲𝐬 𝐥𝐨𝐨𝐤𝐢𝐧𝐠 𝐟𝐨𝐫 𝐬𝐨𝐦𝐞𝐨𝐧𝐞 𝐬𝐭𝐫𝐨𝐧𝐠𝐞𝐫 𝐭𝐨 𝐟𝐢𝐠𝐡𝐭!",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
