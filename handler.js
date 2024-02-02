import { downloadMediaMessage, getContentType } from "@whiskeysockets/baileys";
import getDikti from "./commands/dikti.js";
import { ipaddr } from "./commands/ipaddr.js";
import { tiktokdl } from "./commands/Tiktokv1.js";
import { TiktokV2 } from "./commands/Tiktokv2.js";
import { makeid } from "./lib/makeid.js";
import fs from "fs";
// import menfess from './lib/Menfess.js';

import { insertData } from "./lib/mongoDB.js";
//import { downloadMedia } from "./lib/download.js";

import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";
import { resolve } from "path";
import { promises } from "dns";

export default async function (sock, m) {
  const senderNumber = m.key.remoteJid;
  console.log(m);

  const data = {
    number: m.key.remoteJid,
    nama: m.pushName,
  };
  await insertData(data);
  // const body =
  //   message.message.conversation ||
  //   (message.message.extendedTextMessage &&
  //     message.message.extendedTextMessage.text) ||
  //   (message.imageMessage && message.imageMessage.caption) ||
  //   (message.videoMessage && message.videoMessage.caption);

  if (m.message) {
    m.mtype = getContentType(m.message);

    // m.mtype.imageMessage
    //   ? console.log("ini conversation")
    //   : console.log("ini nganuuu", m.message.extendedTextMessage.quotedMessage);

    try {
      var body =
        m.mtype === "conversation"
          ? m.message.conversation
          : m.mtype == "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype == "videoMessage"
          ? m.message.videoMessage.caption ||
            m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
          : m.mtype == "extendedTextMessage"
          ? m.message.extendedTextMessage.text ||
            m.message.extendedTextMessage.contextInfo.quotedMessage.conversation
          : m.mtype == "ephemeralMessage"
          ? m.message.ephemeralMessage.message.extendedTextMessage.text
          : m.mtype == "buttonsResponseMessage"
          ? m.message.buttonsResponseMessage.selectedButtonId
          : m.mtype == "listResponseMessage"
          ? m.message.listResponseMessage.singleSelectReply.selectedRowId
          : m.mtype == "templateButtonReplyMessage"
          ? m.message.templateButtonReplyMessage.selectedId
          : m.mtype === "messageContextInfo"
          ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
            m.text
          : "";
    } catch (e) {
      console.log(e);
    }
  }

  const reply = async (text) => {
    await sock.sendMessage(senderNumber, { text }, { quoted: m });
  };

  const sendVideo = async (url) => {
    await sock.sendMessage(
      senderNumber,
      { caption: "Nyo videone", video: { url: url } },
      { quoted: m }
    );
  };
  try {
    let prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const firstmess = body.startsWith(prefix);
    let pesan = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    m.args = body.trim().split(/ +/).slice(1);

    if (firstmess) {
      switch (pesan) {
        case "menfess":
          if (m.args.length < 1) {
            reply("Usage: menfess 62xxx(number)");
            return;
          }
          if (!m.args[0].includes("62")) {
            reply("use 628xxx");
            return;
          }
          let menfess = true;
          const senderMenfess = senderNumber;
          const receiverNumber = m.args[0] + "@s.whatsapp.net";
          // const message = m.args.slice(1).join(' ');
          let roomId = makeid(5);

          await sock.sendMessage(receiverNumber, {
            text: `
sesorang ada yang ingin berinteraksi dengan anda menggunakan bot menfess. ketik apa saja untuk mengirimkan pesan. jika anda ingin berhenti ketik "menfess stop (room id anda)" 
id room kamu: ${roomId}`,
          });
          await sock.sendMessage(senderMenfess, {
            text: `
room menfess telah terbuat. semua pesan anda kan dikirimkan ke penerima seluruhnya. ketik apa saja untuk mengirimkan ke penerima. jika ingin berhenti maka ketik menfess stop roomid
id room kamu: ${roomId}`,
          });
          if (senderNumber == receiverNumber) {
            // console.log('case2' + senderNumber);
          }

          const endRoom = await new Promise(async (resolve) => {
            sock.ev.on("messages.upsert", async (m) => {
              m.messages.forEach(async (message) => {
                if (
                  message.message?.extendedTextMessage?.text ||
                  message.message?.extendedTextMessage?.contextInfo?.quotedMessage
                    ?.conversation
                ) {
                  const text =
                    message.message.extendedTextMessage.text ||
                    message.message.extendedTextMessage.contextInfo
                      .quotedMessage.conversation;

                  const me = message.key.fromMe;
                  if (menfess === true && me === false) {
                    let q = message.message.extendedTextMessage.text;
                    // console.log(q);

                    if (message.key.remoteJid == receiverNumber) {
                      await sock.sendMessage(senderMenfess, {
                        text: `Menfess : ${text}`,
                      });
                    } else if (message.key.remoteJid == senderMenfess) {
                      await sock.sendMessage(receiverNumber, {
                        text: `Menfess : ${text}`,
                      });
                    }

                    message.key.remoteJid == receiverNumber &&
                    q.includes(`stop ${roomId}`)
                      ? ((menfess = false), resolve("chat room telah berakhir"))
                      : message.key.remoteJid == senderMenfess &&
                        q.includes(`stop ${roomId}`)
                      ? ((menfess = false), resolve("chat room telah berakhir"))
                      : "";
                  }
                }
              });
            });
          });
          await sock.sendMessage(senderMenfess, { text: endRoom });
          await sock.sendMessage(receiverNumber, { text: endRoom });

          break;

        case "oii":
          {
            reply("oii");
          }
          break;
        case "pagi":
          reply("pagi jugaa");
          break;
        case "tt":
        case "tiktok":
          const tiktok2 = (url) => {
            try {
              TiktokV2(url);
            } catch (err) {}
          };
          try {
            let tiktok = await tiktokdl(m.args[0]);
            sendVideo(tiktok);
          } catch (err) {
            tiktok2(m.args[0]);
          }

          break;
        case "dikti":
          reply(await getDikti(m.args.join(" ")));
        case "p":
          console.log(m);
          break;
        case "s":
          {
            // download the message
            const media = await downloadMediaMessage(
              m,
              "buffer" || "stream",
              {},
              {
                // logger,
                // // pass this so that baileys can request a reupload of media
                // // that has been deleted
                // reuploadRequest: sock.updateMediaMessage
              }
            );

            let jancok = new Sticker(media, {
              pack: "TRIBOT", // The pack name
              author: "SYAUQI MEME DEPOK " + makeid(5), // The author name
              type: StickerTypes.FULL, // The sticker type
              categories: ["🤩", "🎉"], // The sticker category
              id: makeid(5), // The sticker id
              quality: 50, // The quality of the output file
              background: "#FFFFFF00", // The sticker background color (only for full stickers)
            });

            const sticker = await jancok.toMessage();
            await sock.sendMessage(senderNumber, sticker, {
              quoted: m,
            });

            console.log(senderNumber);
          }
          break;
        case "sgif":
        case "sgift":
          {
            let media =
              `https://vihangayt.me/maker/text2gif?q=` + m.args.join(" ");
            let jancok = new Sticker(media, {
              pack: "TRIBOT", // The pack name
              author: "SYAUQI MEME DEPOK " + makeid(10), // The author name
              type: StickerTypes.FULL, // The sticker type
              categories: ["🤩", "🎉"], // The sticker category
              id: makeid(5), // The sticker id
              quality: 50, // The quality of the output file
              background: "#FFFFFF00", // The sticker background color (only for full stickers)
            });
            const sticker = await jancok.toMessage();
            await sock.sendMessage(senderNumber, sticker, {
              quoted: m,
            });
          }
          break;
        case "stext":
          {
            let media =
              `https://vihangayt.me/maker/text2img?q=` + m.args.join(" ");
            let jancok = new Sticker(media, {
              pack: "TRIBOT", // The pack name
              author: "SYAUQI MEME DEPOK " + makeid(10), // The author name
              type: StickerTypes.FULL, // The sticker type
              categories: ["🤩", "🎉"], // The sticker category
              id: makeid(5), // The sticker id
              quality: 50, // The quality of the output file
              background: "#FFFFFF00", // The sticker background color (only for full stickers)
            });
            const sticker = await jancok.toMessage();
            await sock.sendMessage(senderNumber, sticker, {
              quoted: m,
            });
          }
          break;
        case "upload":
        case "tourl":
        case "tolink":
          {
            reply("Prosess");
            const medias = await downloadMediaMessage(
              m,
              "buffer" || "stream",
              {},
              {
                // logger,
                // // pass this so that baileys can request a reupload of media
                // // that has been deleted
                // reuploadRequest: sock.updateMediaMessage
              }
            );
            let media = await fs.writeFileSync("test", medias);
            let { TelegraPh } = await import("./lib/uploader.js");
            let anu = await TelegraPh("test");
            console.log(anu);
            reply(anu);
            fs.unlinkSync("test");
          }
          break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

//   if (body == 'hola') {
//     var id = '6289649178812@s.whatsapp.net';
//     await sock.sendMessage(id, {text: 'oh hello there'});
//   }
