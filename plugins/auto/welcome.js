const WELCOME_GROUP = "120363409152399401@g.us"; // حط ايدي القروب هنا

export default async function before(m, { conn }) {
    if (m.mtype !== 'group-participants-update') return false;

    const { id, participants, action } = m;

    // يخليها بس لقروب الاستقبال
    if (id !== WELCOME_GROUP) return false;

    // فقط عند دخول عضو
    if (action !== 'add') return false;

    for (let user of participants) {

        const text = `
*⌬∙ • ──╾⊱﹝﷽﹞⊰╼── • ∙⌬*

*أهلاً بك في إستقبال نقابة:*

•✠ 𝐄𝐗𝐎𝐍𝐈𝐀 🔱✠•

*من فضلك إملأ الاستمـ📋ـارة :*

◉━━━─ •༺ 🔱 ༻• ─━━━◉
✎⬳لقبك ⊰【】⊱

✎⬳اسم الانمي الي جبت منه اللقب ⊰【】⊱

✎⬳من طرف مين ⊰【】⊱

✎⬳ولد ولا بنت ⊰【 】⊱

●━━━ • ━❪ 🔱 ❫━ • ━━━●

💠عبي الاستماره و منشن احد المشرفين┋📩

💠ارفق مع لقبك صورة لـ الشخصيه┋⚜️

💠ممنوع ولد يختار لقب بنت و العكس┋💱

◉━━━─ •༺ 🔱 ༻• ─━━━◉
`;

        await conn.sendMessage(id, {
            text,
            mentions: [user]
        });
    }

    return false;
}
