const handler = async (m, { conn, text, command }) => {
    if (!m.isGroup) return m.reply('هذا الأمر يستخدم في المجموعات فقط ❌');

    const actions = {
        'قروب_اسم': async () => {
            if (!text) return m.reply('✏️ ~ اكتب الاسم الجديد');
            await conn.groupUpdateSubject(m.chat, text);
            m.reply('✅ ~ تم تغيير اسم القروب');
        },

        'قروب_وصف': async () => {
            if (!text) return m.reply('📝 ~ اكتب الوصف الجديد');
            await conn.groupUpdateDescription(m.chat, text);
            m.reply('✅ ~ تم تغيير وصف القروب');
        },

        'قروب_صورة': async () => {
            const q = m.quoted || m;
            const mime = q.mimetype || '';

            if (!/image/.test(mime)) {
                return m.reply('🖼️ ~ رد على الصورة');
            }

            const media = await q.download();
            await conn.updateProfilePicture(m.chat, media);
            m.reply('✅ ~ تم تغيير صورة القروب');
        }
    };

    const action = actions[command];
    if (!action) return;

    try {
        await action();
    } catch (e) {
        console.error(e);
        m.reply(e.message);
    }
};

handler.command = ['قروب_اسم', 'قروب_وصف', 'قروب_صورة'];
handler.usage = ['قروب_اسم', 'قروب_وصف', 'قروب_صورة'];
handler.category = "admin";
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
