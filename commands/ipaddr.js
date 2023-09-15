import p from "phin";
import utils from "../lib/utils.js";

export async function ipaddr(senderNumber) {
  try {
    const res = await p({
      url: "https://api.myip.com",
      parse: "json",
    });

    await utils.sendText(`${res.body.ip}`, senderNumber)
  } catch (e) {
    console.log(e);
  }
}
