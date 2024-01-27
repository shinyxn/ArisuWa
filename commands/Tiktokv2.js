import axios from 'axios';
export const TiktokV2 = async (url) => {
  try {
    let res = await axios.get(
      'https://api-tools.tribone.my.id/servertiktok2?url=' + url,
    );
    // console.log(res.data.data.url);
    return res.data.data.url;
  } catch (err) {
    console.error(err);
  }
};

TiktokV2('https://vt.tiktok.com/ZSNENxYje/');
