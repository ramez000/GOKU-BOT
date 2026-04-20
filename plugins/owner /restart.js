const test = async (m, { conn, bot }) => {
  m.react("🟢")
  
  conn.msgUrl(m.chat, "⚙️ Bot is restarting...", { 
    title: "",
    body: "",
    img: "https://i.imgur.com/clDbZ1w.jpeg",
    big: false 
  });
  
  setTimeout(() => {
    bot.restart();
  }, 1000); 
};

test.usage = ["رستارت"]
test.category = "owner";
test.command = ["رستارت", "restart"];
test.owner = true;
export default test;
