const run = async (m, { bot, conn }) => {
const res = (await bot.errors()).map(x => `\n
#📄 الملف: ${x.file}
#⌨️ الأمر: ${x.command}
#❌ الخطأ: ${x.error}
==============`).join(" ")
m.reply(res)
}
run.command = ["الأخطاء"]
run.usage = ["الأخطاء"];
run.category = "owner";
run.owner = true;
export default run
