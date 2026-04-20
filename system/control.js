import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;

        const participants = event.participants.filter(p => p?.phoneNumber).map(p => p.phoneNumber);
        const author = event.author;
        let txt;

        const users = participants.length 
            ? participants.map(p => '@' + p.split('@')[0]).join(' and ') 
            : 'No users';
        const authorTag = author ? '@' + author.split('@')[0] : 'Unknown';

        const messages = {
            add: `*أرحب نورتنا 💝✨*\n*【 ${users}${authorTag === users ? "" : ` 】*\n*أُضيف بواسطة:〖 ${authorTag}`} 〗*`,
            remove: `*تم إزالة العضو:【 ${users}${authorTag === users ? "" : ` 】*\n*أُزيل بواسطة:〖 ${authorTag}`} 〗*`,
            promote: `*تم رفع العضو:【 ${users} 】*\n*رُفِع بواسطة:〖 ${authorTag} 〗*`,
            demote: `*تم خفض العضو:【 ${users} 】*\n*خُفِّض بواسطة:〖 ${authorTag} 〗*`
        };

        txt = messages[eventType];
        if (!txt) return null;
        
        if (global.db.groups[event.chat].noWelcome === true) return 9999;

        const img = ["remove", "add"].includes(eventType) 
            ? (event.userUrl || "https://files.catbox.moe/hm9iq4.jpg") 
            : "https://files.catbox.moe/hm9iq4.jpg";

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: ctx.config?.info.nameBot || "WhatsApp Bot",
            body: "",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '',
                jid: ''
            },
            big: ["remove", "add"].includes(eventType)
        });

    } catch (e) {
        console.error(e);
    }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    const quoted = {
        key: {
            participant: `${msg.sender.split('@')[0]}@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: `${msg.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${msg.pushName}\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nEND:VCARD`,
            },
        },
        participant: '0@s.whatsapp.net',
    };
    
    const messages = {
        cooldown: `*⏳ يرجى الإنتظار ${time || 'بعد كم ثانية'} ثانية وكمل الأمر ⏳*\n*⊱⋅ ──────────── ⋅⊰*\n> *_يجب أن تنتظر لأن هذا الأمر يمنع فيه السبام ❗_*`,
        owner: `*👨‍💻 هذا الأمر للمطورين فقط 👨‍💻*\n*⊱⋅ ──────────── ⋅⊰*\n> *_هذا الأمر لمطورين البوت فقط، ويجب أن تصبح مطوراً أولاً لتتمكن من إستخدامه 👨‍💻_`,
        group: `*👥 الأمر للمجموعات فقط 👥*\n*⊱⋅ ──────────── ⋅⊰*\n> *_هذا الأمر مخصص للمجموعات فقط 👥_*`,
        admin: `*👨‍⚖️ الأمر للمشرفين فقط 👨‍⚖️*\n*⊱⋅ ──────────── ⋅⊰*\n> *_هذا الأمر للمشرفين فقط، ويجب أن تصبح مشرفاً أولاً لتتمكن من إستخدامه 👨‍⚖️_*`,
        private: `*🔏 الأمر للخاص فقط 🔏*\n*⊱⋅ ──────────── ⋅⊰*\n> *_هذا الأمر يستخدم في الخاص بس يا حب 🔏_*`,
        botAdmin: `*📌 الأمر للبوت المشرف فقط 📌*\n*⊱⋅ ──────────── ⋅⊰*\n> *_يجب أن يكون البوت مشرفاً ليعمل الأمر 📌_*`,
        noSub: `*📡 الأمر للبوت الأساسي فقط 📡*\n*⊱⋅ ──────────── ⋅⊰*\n> *_ادخل هذه المجموعة وجرب الأوامر اللي تريدها: ｟ https://chat.whatsapp.com/L5be6EDbRGCKki6kHZrzAu ｠_*\n> *بس من غير سبام*`,
        disabled: `*🗃️ الامر متوقف (تحت الصيانة) 🗃️*\n*⊱⋅ ──────────── ⋅⊰*\n> *_الأمر تحت الصيانه حالياً وسيعمل مجدداً قريباً_*`,
        error: `*❌ الأمر فيه خطأ، كلم المطورين ❌*\n*⊱⋅ ──────────── ⋅⊰*\n*_اكتب " .المطور " لكي يرسل لك رقم المطور_*`
    };
    
    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.imgur.com/syAxGOj.jpeg",
            title: "",
            body: "",
            newsletter: {
                name: '',
                jid: ''
            },
            big: false
        }, quoted);
        return false;  
    }
    return null;  
};

export { access, group };
