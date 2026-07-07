const handler = async (m, { conn, text, bot }) => {
  if (!m.isOwner) {
    const ownerJid = bot?.config?.owners[0]?.jid
    m.reply("` • تم إرسال طلبك للمطور • `")
    await conn.sendMessage(ownerJid, { text: `🔔 *طلب دخول قروب*\nمن: @${m.sender.split("@")[0]}\nالرابط: ${text || "لم يرسل رابط"}`, mentions: [m.sender] });
    return m.reply("✅ تم إرسال طلبك للمطور");
  }

  if (!text) return m.reply("❌ أرسل رابط قروب واتساب");
  if (!text.includes("https://chat.whatsapp.com/")) return m.reply("❌ رابط واتساب فقط");

  m.react("📂");
  await conn.groupJoin(text);
  m.reply("✅ تم الدخول");
};

handler.usage = ["انضم"];
handler.category = "group";
handler.command = ["انضم", "ادخل"];

export default handler;
