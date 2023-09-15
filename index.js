import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("login");
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      var _a, _b;
      var shouldReconnect =
        ((_b =
          (_a = lastDisconnect.error) === null || _a === void 0
            ? void 0
            : _a.output) === null || _b === void 0
          ? void 0
          : _b.statusCode) !== DisconnectReason.loggedOut;
      console.log(
        "connection closed due to ",
        lastDisconnect.error,
        ", reconnecting ",
        shouldReconnect
      );
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("opened connection");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (m) => {
    m.messages.forEach(async (message) => {
      if (
        !message.message ||
        message.key.fromMe ||
        (message.key && message.key.remoteJid == "status@broadcast")
      )
        return;
      if (message.message.ephemeralMessage) {
        message.message = message.message.ephemeralMessage.message;
      }

      const senderNumber = message.key.remoteJid;
      const textMessage =
        message.message.conversation ||
        (message.message.extendedTextMessage &&
          message.message.extendedTextMessage.text) ||
        (imageMessage && imageMessage.caption) ||
        (videoMessage && videoMessage.caption);

      if (textMessage == "halo") {
        await sock.sendMessage(
          senderNumber,
          { text: "Halo juga" },
          { quoted: message }
        );
      }
      console.log(textMessage);
      // try {
      // 	await sock.sendPresenceUpdate('composing', message.key.remoteJid)
      // 	await messageHandler(sock, message);
      // } catch(e) {
      // 	if (!global.yargs.dev) {
      // 		console.log("[ERROR] " + e.message);
      // 		sock.sendMessage(message.key.remoteJid, {"text":"Terjadi error! coba lagi nanti"}, { quoted: message });
      // 	} else {
      // 		console.log(e);
      // 	}
      // } finally {
      // 	await sock.sendPresenceUpdate('available', message.key.remoteJid)
      // }
    });

    // console.log(m)

    // if (m.messages[0].message.conversation == 'halo') {
    //     await sock.sendMessage(m.messages[0].key.remoteJid, { text: 'Hello there!' }, { quoted: m.messages[0] });
    // }
    // console.log(JSON.stringify(m, undefined, 2))

    // console.log('replying to', m.messages[0].key.remoteJid)
    // await sock.sendMessage(m.messages[0].key.remoteJid, { text: 'Hello there!' })
  });
}
// run in main file
connectToWhatsApp();
