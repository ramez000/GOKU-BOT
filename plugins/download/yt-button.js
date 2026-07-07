const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("💙 ~ اكتب نص الفيديو او الاغنيه ~ ❤️");
    
    const res = await fetch(`https://emam-api.web.id/home/sections/Search/api/YouTube/search?q=${text}`);
    const { data } = await res.json();
    const { title, image, timestamp: time, url } = data[0];

    await conn.sendButton(m.chat, {
        imageUrl: image,
        bodyText: `${title} ╎ ${time}`,
        footerText: "",
        buttons: [
            { name: "quick_reply", params: { display_text: "🎼 ╎ تـحـمـيـل صـوت", id: `.يوت_اغنيه ${url}` } },
            { name: "quick_reply", params: { display_text: "🎬 ╎ تـحـمـيـل فـيـديـو", id: `.يوتيوب ${url}` } }
        ],
        mentions: [m.sender],
        newsletter: { name: "𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉", jid: "120363409497248238@newsletter" },
        interactiveConfig: { buttons_limits: 10, list_title: "GOKU 🐉", button_title: "GOKU 🐉", canonical_url: url }
    }, m);
};

handler.usage = ["فيديو", "اغنية", "شغل"];
handler.category = "downloads";
handler.command = ["اغنية", "فيديو", "اغنية", "play", "video"];

export default handler;
