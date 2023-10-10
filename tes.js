import p from "phin";

async function tes() {
  const res = await p({
    url: "https://api.myip.com",
    parse: "json",
  });

  console.log(res.body);
}

tes();
