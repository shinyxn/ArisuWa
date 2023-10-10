import { ipaddr } from "./commands/ipaddr.js";

export default async function (sock, message) {
  const senderNumber = message.key.remoteJid;
  const textMessage =
    message.message.conversation ||
    (message.message.extendedTextMessage &&
      message.message.extendedTextMessage.text) ||
    (message.imageMessage && message.imageMessage.caption) ||
    (message.videoMessage && message.videoMessage.caption);

  const reply = async (text) => {
    await sock.sendMessage(senderNumber, { text }, { quoted: message });
  };

  let prefix = /^[\\/!#.]/gi.test(textMessage)
    ? textMessage.match(/^[\\/!#.]/gi)
    : "/";
  if (textMessage) {
    const firstmess = textMessage.startsWith(prefix);
    let pesan = textMessage
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();

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
      }
    }

    if (textMessage == "hola") {
      var id = "6289649178812@s.whatsapp.net";
      await sock.sendMessage(id, { text: "oh hello there" });
    }

    if (textMessage == "ip") {
      ipaddr(sock, message, senderNumber);
    }
  } else {
    console.error("wa desktop detected");
  }
}
