const handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply("*رد على الرسالة!*")
  m.quoted.delete()
 // m.delete()
};

handler.command = ["حذف"];
handler.usage = ['حذف'];
handler.category = "admin";
handler.admin = true;

export default handler;
