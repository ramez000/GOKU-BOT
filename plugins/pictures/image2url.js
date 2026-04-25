import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { uploadToQuax } from "../../system/utils.js";

const handler = async (m, { conn, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw '*❲ ❤️ ❳ ~ رد على الصورة أو الفيديو أو الصوت ~ ❲ 💙 ❳ *';
  
  const media = await q.download();
  const link = await uploadToQuax(media);
  
  await conn.sendButton(m.chat, {
    imageUrl: link,
    bodyText: "🗃️ ~ Successful *(catbox.moe)*\n- ```" + link + "```",
    footerText: "𝐆𝐎𝐊𝐔 ~ RAMEZ",
    buttons: [
      { name: "cta_copy", params: { display_text: "Copy Link", copy_code: link } },
    ],
    mentions: [m.sender],
    newsletter: {
      name: '',
      jid: ''
    },
    interactiveConfig: {
      buttons_limits: 10,
      list_title: "",
      button_title: "Click Here",
      canonical_url: "https://vxv-profile.vercel.app"
    }
  }, m);
};

handler.usage = ["لرابط"];
handler.category = "tools";
handler.command = ['لرابط', 'image2url'];

export default handler;
