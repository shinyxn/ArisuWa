import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys';
import handler from './handler.js';
import moment from 'moment-timezone';
import {run} from './lib/mongoDB.js';
async function connectToWhatsApp() {
  const {state, saveCreds} = await useMultiFileAuthState('login');
  const {version, isLatest} = await fetchLatestBaileysVersion();
  await run();
  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on('connection.update', async (update) => {
    const {connection, lastDisconnect} = update;
    if (connection === 'close') {
      var _a, _b;
      var shouldReconnect =
        ((_b =
          (_a = lastDisconnect.error) === null || _a === void 0
            ? void 0
            : _a.output) === null || _b === void 0
          ? void 0
          : _b.statusCode) !== DisconnectReason.loggedOut;
      console.log(
        'connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect,
      );
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      var now = new Date();
      var wib = moment.tz(now, 'Asia/Jakarta');
      var namaHariDiWIB = wib.format('dddd').toLowerCase();
      if (namaHariDiWIB === 'monday') {
        setInterval(function () {
          var now = new Date();
          var wib = moment.tz(now, 'Asia/Jakarta');
          var waktuDiWIB = wib.format('HH:mm');
          var namaHariDiWIB = wib.format('dddd').toLowerCase();

          if (waktuDiWIB === '07:40') {
            /// kirim pesan setiap kondisi
            console.log('halo');
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'jadwal praktikum pak ridwan jam 8 pagi !!!!',
            });
          } else if (waktuDiWIB === '07:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'gass keruang jj-303 praktikum di mulai',
            });
          } else if (waktuDiWIB === '13:25') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'pak aries 13.50 coyy siap siap 25 menit lagi',
            });
          } else if (waktuDiWIB === '13:49') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'gass keruang 3 105 praktikum pak aries!!!',
            });
          }
        }, 15000);
      } else if (namaHariDiWIB === 'tuesday') {
        setInterval(function () {
          var now = new Date();
          var wib = moment.tz(now, 'Asia/Jakarta');
          var waktuDiWIB = wib.format('HH:mm');
          var namaHariDiWIB = wib.format('dddd').toLowerCase();
          if (waktuDiWIB === '07:40') {
            /// kirim pesan setiap kondisi
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'jadwal praktikum bu norma arkom jam 8 pagi !!!!',
            });
          } else if (waktuDiWIB === '07:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'gasss praktikum bu norma arkom jam 8 pagi !!!!',
            });
          } else if (waktuDiWIB === '12:40') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'bu mike jan lupa di ruang a301 jam 13.00 !!!!',
            });
          } else if (waktuDiWIB === '12:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'bu mike di ruang a301 jam 13.00 !!!!',
            });
          } else if (waktuDiWIB === '14:40') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'jan  balik dulu pak amran jan 14.40',
            });
          }
        }, 15000);
      } else if (namaHariDiWIB === 'wednesday') {
        setInterval(function () {
          var now = new Date();
          var wib = moment.tz(now, 'Asia/Jakarta');
          var waktuDiWIB = wib.format('HH:mm');
          var namaHariDiWIB = wib.format('dddd').toLowerCase();

          if (waktuDiWIB === '07:40') {
            /// kirim pesan setiap kondisi
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'jadwal praktikum bu mikee jam 8 pagi di ruang jj-309 !!!!',
            });
          } else if (waktuDiWIB === '07:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'gass keruang jj-309 praktikum di mulai',
            });
          } else if (waktuDiWIB === '11:20') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'bu afifah coyy',
            });
          } else if (waktuDiWIB === '12:00') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'praktikum bu f=afifah di ruang A 303',
            });
          }
        }, 15000);
      } else if (namaHariDiWIB === 'thursday') {
        setInterval(function () {
          var now = new Date();
          var wib = moment.tz(now, 'Asia/Jakarta');
          var waktuDiWIB = wib.format('HH:mm');
          var namaHariDiWIB = wib.format('dddd').toLowerCase();

          if (waktuDiWIB === '07:40') {
            /// kirim pesan setiap kondisi
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'AGAMA YANG ISLAM DI TEATER GEDUNG D3 !!!!',
            });
          } else if (waktuDiWIB === '07:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'AGAMA DI TEADER D3 !!!!',
            });
          } else if (waktuDiWIB === '13:20') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'PAK ARIES JANGAN TELAT JAM 13.50!!!',
            });
          } else if (waktuDiWIB === '13:49') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'PAK ARIES di ruang A 303',
            });
          }
        }, 15000);
      } else if (namaHariDiWIB === 'friday') {
        setInterval(function () {
          var now = new Date();
          var wib = moment.tz(now, 'Asia/Jakarta');
          var waktuDiWIB = wib.format('HH:mm');
          var namaHariDiWIB = wib.format('dddd').toLowerCase();

          if (waktuDiWIB === '07:40') {
            /// kirim pesan setiap kondisi
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'workshop bu norma jam 8 !!!!',
            });
          } else if (waktuDiWIB === '07:59') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'workshop bu norma !!!',
            });
          } else if (waktuDiWIB === '12:40') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'persiapkan otakmu untuk MTK!',
            });
          } else if (waktuDiWIB === '12:00') {
            var id = '6289649178812@s.whatsapp.net';
            sock.sendMessage(id, {
              text: 'BISMILLAH MTK MASUK DI OTAK',
            });
          }
        }, 15000);
      }
      // masih error karna setiap pesan masuk kondisi terus kepanggil dan ketika tidak ada pesan masuk kondisi tidak di periksa
      console.log('opened connection');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (m) => {
    m.messages.forEach(async (message) => {
      if (
        !message.message ||
        message.key.fromMe ||
        (message.key && message.key.remoteJid == 'status@broadcast')
      )
        return;

      // if (message.message.ephemeralMessage) {
      //   message.message = message.message.ephemeralMessage.message;
      // }

      await handler(sock, message);

      // if (textMessage == "halo") {
      //   await sock.sendMessage(
      //     senderNumber,
      //     { text: "Halo juga" },
      //     { quoted: message }
      //   );
      // }
      // console.log(textMessage);
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
