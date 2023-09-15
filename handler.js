import { ipaddr } from "./commands/ipaddr.js";

export default async function (sock, message) {
  const senderNumber = message.key.remoteJid;
  const textMessage =
    message.message.conversation ||
    (message.message.extendedTextMessage &&
      message.message.extendedTextMessage.text) ||
    (imageMessage && imageMessage.caption) ||
    (videoMessage && videoMessage.caption);

  if (textMessage == "hola") {
    await sock.sendMessage(
      senderNumber,
      { text: "Halo juga" },
      { quoted: message }
    );
  }

  if (textMessage == "ip") {
    ipaddr(sock, message, senderNumber)
  }
}
