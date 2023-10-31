import p from "phin";

export default async function getDikti(nama) {
  const who = encodeURIComponent(nama);

  try {
    const res = await p({
      url: `https://api-frontend.kemdikbud.go.id/hit_mhs/${who}`,
      parse: "json",
    });
    console.log(nama);
    console.log(who);
    return res.body.mahasiswa[0].text;
  } catch (e) {
    console.log(e);
  }
}
