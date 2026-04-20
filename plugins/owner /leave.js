const handler = async (m, { conn, text }) => {
  m.reply("*اسف مضطرة اخرج عشان مطوري اشوفكم بعدين ⁦🐉💖*")
  conn.groupLeave(m.chat)
};

handler.usage = ["اخرج"];
handler.category = "group";
handler.command = ["اخرج"];
handler.owner = true 
export default handler;
