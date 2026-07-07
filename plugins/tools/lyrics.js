import { Scrapy } from "kintoun";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("مثال: .كلمات popular");
  
  const response = await Scrapy.lyrics(text);
  
  if (!response.ok) return m.reply("❌ لم يتم العثور على كلمات الأغنية");
  
  const data = response.data;
  
  let result = `🎵 *${data.trackName}* 🎵\n`;
  result += `👤 *الفنان:* ${data.artistName}\n`;
  result += `💿 *الألبوم:* ${data.albumName}\n`;
  result += `⏱️ *المدة:* ${Math.floor(data.duration / 60)}:${(data.duration % 60).toString().padStart(2, '0')}\n\n`;
  result += `📝 *كلمات الأغنية:*\n\`\`\`\n${data.plainLyrics}\n\`\`\``;
  
  await conn.sendMessage(m.chat, { text: result }, { quoted: m });
}

handler.usage = ["كلمات"];
handler.command = ["كلمات", "lyrics"];
handler.category = "tools";

export default handler;
