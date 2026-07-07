const test = async (m, { conn, bot }) => {
  m.react("🟢")
  
  conn.msgUrl(m.chat, "*🐉 Bot is restarting...*", { 
    title: "",
    body: "",
    img: "https://i.imgur.com/EDACnrc.jpeg",
    big: false 
  });
  
  setTimeout(() => {
    bot.restart();
  }, 1000); 
};

test.usage = ["ريستارت"]
test.category = "owner";
test.command = ["ريستارت", "restart"];
test.owner = true;
export default test;
