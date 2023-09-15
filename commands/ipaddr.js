import p from "phin";

export async function ipaddr(sock, message, senderNumber) {
  try {
    const res = await p({
      url: "https://api.myip.com",
      parse: "json",
    });

    await sock.sendMessage(
      senderNumber,
      { text: `${res.body.ip}` },
      { quoted: message }
    );
  } catch (e) {
    console.log(e);
  }
}
