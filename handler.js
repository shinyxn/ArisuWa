import { ipaddr } from "./commands/ipaddr.js";
import utils from "./lib/utils.js";

export default async function (sock, message) {
  const senderNumber = message.key.remoteJid;
  const textMessage =
    message.message.conversation ||
    (message.message.extendedTextMessage &&
      message.message.extendedTextMessage.text) ||
    (imageMessage && imageMessage.caption) ||
    (videoMessage && videoMessage.caption);

  if (textMessage == "hola") {
    utils.sendText('iayyayaya', senderNumber)
  }

  if (textMessage == "ip") {
    ipaddr(senderNumber)
  }
}
