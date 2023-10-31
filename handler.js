import { downloadMediaMessage, getContentType } from "@whiskeysockets/baileys";
import getDikti from "./commands/dikti.js";
import { ipaddr } from "./commands/ipaddr.js";
import { tiktokdl } from "./commands/tiktok.js";
import fs from "fs/promises";

import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";

export default async function (sock, m) {
  const senderNumber = m.key.remoteJid;

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
          ? m.message.videoMessage.caption
          : m.mtype == "extendedTextMessage"
          ? m.message.extendedTextMessage.text
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

  let prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";

  const firstmess = body.startsWith(prefix);
  let pesan = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
  m.args = body.trim().split(/ +/).slice(1);

  if (firstmess) {
    switch (pesan) {
      case "oii":
        {
          reply("oii");
        }
        break;
      case "pagi":
        reply("pagi jugaa");
        break;
      case "tiktok":
        sendVideo(await tiktokdl(m.args[0]));
        break;
      case "dikti":
        reply(await getDikti(m.args.join(" ")));
      case "p":
        console.log(m);
        break;
      case "s": {
        if (m.mtype === "imageMessage") {
          // download the message
          const media = await downloadMediaMessage(
            m,
            "buffer",
            {},
            {
              // logger,
              // // pass this so that baileys can request a reupload of media
              // // that has been deleted
              // reuploadRequest: sock.updateMediaMessage
            }
          );

          let jancok = new Sticker(media, {
            pack: "packName", // The pack name
            author: "authorName", // The author name
            type: StickerTypes.FULL, // The sticker type
            categories: ["🤩", "🎉"], // The sticker category
            id: "12345", // The sticker id
            quality: 50, // The quality of the output file
            background: "#FFFFFF00", // The sticker background color (only for full stickers)
          });
          let stok = "dfjshfodfj.webp";

          const buffer = await jancok.toBuffer();

          await fs.writeFile("asu.webp", buffer);
          // let nono = await jancok.toFile(stok);
          //let nah = fs.readFileSync(nono);
          await sock.sendMessage(senderNumber, await jancok.toMessage(), {
            quoted: m,
          });
          // await sock.sendMessage(
          //   senderNumber,
          //   { sticker: fs.readFile("sekarep.jpg") },
          //   { quoted: m }
          // );
          //  await fs.unlinkSync(stok);
          // await fs.unlinkSync(media);
          console.log(senderNumber);
        }
      }
    }
  }

  if (body == "hola") {
    var id = "6289649178812@s.whatsapp.net";
    await sock.sendMessage(id, { text: "oh hello there" });
  }

  if (body == "ip") {
    ipaddr(sock, m, senderNumber);
  }
}
