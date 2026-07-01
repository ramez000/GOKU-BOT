import { Client } from 'Kintoun';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '249115962269', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
  // Owner 1
    { name: "RAMEZ", lid: "", jid: "249962416396@s.whatsapp.net" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "𝐆𝐎𝐊𝐔 𝐁𝐎𝐓🐉", 
  nameChannel: "𝐆𝐎𝐊𝐔-𝐁𝐎𝐓 🐉", 
  idChannel: "@newsletter",
  urls: {
    repo: "https://github.com/ramez000/GOKU-BOT",
    api: "https://emam-api.web.id",
    channel: "120363409497248238@newsletter"
  },
  copyright: { 
    pack: '', 
    author: ''
  },
  images: [
    "https://i.imgur.com/clDbZ1w.jpeg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/
