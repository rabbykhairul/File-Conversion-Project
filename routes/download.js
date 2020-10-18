const express = require("express");
const router = express.Router();
const path = require("path");
const cors = require("cors");

router.use(cors());

router.get("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filesDirectory = path.join(__dirname, "../public/uploads");
  const filePath = path.join(filesDirectory, fileName);
  console.log(filePath);
  res.download(filePath);
});

module.exports = router;
