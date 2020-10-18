const path = require("path");
const fs = require("fs");
const urlMap = require("../datas/url-map.json");
const get_file_url = require("./get_file_url");

const urlMapFile = path.join(__dirname, "../datas/url-map.json");

const build_short_url = (filePath) => {
  const originalURL = get_file_url(filePath);
  const shortURL = generate_short_code();
  map_short_url_with_original_url(shortURL, originalURL);
  return `http://localhost:3000/r/${shortURL}`;
};

const generate_short_code = () => {
  let shortCode = bulid_code();
  while (true) {
    if (short_code_already_exists(shortCode)) {
      shortCode = bulid_code();
    } else {
      return shortCode;
    }
  }
};

const short_code_already_exists = (shortCode) => {
  return urlMap[shortCode] != undefined;
};

const bulid_code = () => {
  const charBox =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  let charBoxLength = charBox.length;
  let code = "";

  for (let i = 0; i < 6; i++) {
    let idx = Math.floor(Math.random() * charBoxLength);
    code += charBox[idx];
  }

  return code;
};

const map_short_url_with_original_url = (shortURL, originalURL) => {
  urlMap[shortURL] = originalURL;
  fs.writeFile(urlMapFile, JSON.stringify(urlMap), (err) => {
    if (err) throw err;
    console.log("Writing successful!");
  });
};

module.exports = build_short_url;
