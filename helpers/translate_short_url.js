const urlMap = require("../datas/url-map.json");
const { ErrorHandler } = require("./errors");

const translate_short_url = (shortURL) => {
  if (urlMap[shortURL] != undefined) {
    const originalURL = urlMap[shortURL];
    return originalURL;
  } else {
    throw new ErrorHandler(404, "The requested resource couldn't be found!");
  }
};

module.exports = translate_short_url;
