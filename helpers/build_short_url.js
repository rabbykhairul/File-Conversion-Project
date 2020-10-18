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
  return "Short1";
};

const map_short_url_with_original_url = (shortURL, originalURL) => {
  urlMap[shortURL] = originalURL;
  fs.writeFile(urlMapFile, JSON.stringify(urlMap), (err) => {
    if (err) throw err;
    console.log("Writing successful!");
  });
};

module.exports = build_short_url;
