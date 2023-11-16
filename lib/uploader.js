import axios from "axios";
import BodyForm from "form-data";
import fs from "fs";

function TelegraPh(Path) {
  return new Promise(async (resolve, reject) => {
    //if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(Path));
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      console.log(data);
      let srcUrl = "";
      try {
        srcUrl = "https://telegra.ph" + data.data[0].src;
      } catch (errorr) {
        return resolve(data.data.error);
      }

      return resolve(srcUrl);
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
}

export { TelegraPh };
