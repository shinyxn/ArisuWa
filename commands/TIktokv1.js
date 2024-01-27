import p from 'phin';

export async function tiktokdl(url) {
  try {
    const res = await p({
      url: `https://vihangayt.me/download/tiktok?url=${url}`,
      parse: 'json',
    });

    return res.body.data.links[0].a;
  } catch (e) {
    console.log(e);
  }
}
