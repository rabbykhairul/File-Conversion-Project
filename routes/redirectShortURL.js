const express = require("express");
const router = express.Router();

const translate_short_url = require("../helpers/translate_short_url");

router.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const originalURL = translate_short_url(shortURL);
  res.redirect(303, originalURL);
});

module.exports = router;
