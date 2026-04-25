 const handler = async (m, { conn }) => {
    const q = m.quoted || m;
    const mime = q.mimetype || '';

    if (!/image/.test(mime)) {
        return m.reply('🖼️ ~ رد على صورة لتغيير صورة البوت');
    }

    try {
        const media = await q.download();
        await conn.updateProfilePicture(conn.user.jid, media);
        m.reply('✅ ~ تم تغيير صورة بروفايل البوت');
    } catch (error) {
        console.error(error);
        m.reply(error.message);
    }
};

handler.usage = ["صوره_بوت"];
handler.category = "owner";
handler.command = ["صوره_بوت", "botpp""];
handler.owner = true;

export default handler;
