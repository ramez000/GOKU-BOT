const test = async (m, { conn, bot }) => {
  m.react("🟢")
  
  conn.msgUrl(m.chat, "⛔ Stopping the bot...", { 
    title: "",
    body: "",
    img: "https://i.imgur.com/kclrQHI.jpeg",
    big: false 
  });
  
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true;
export default test;
