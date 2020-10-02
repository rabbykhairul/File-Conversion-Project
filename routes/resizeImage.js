const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { ErrorHandler } = require("../helpers/errors");
const is_valid_image = require("../helpers/is_valid_image");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    is_valid_image(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  if (req.file == undefined) {
    throw new ErrorHandler(
      404,
      "You have not selected any image file. Please select an image from your device to sumbmit and try again."
    );
  }
  const imgInfo = {
    originalFileName: req.file.originalname,
    ecoding: req.file.encoding,
    mimetype: req.file.mimetype,
    size: req.file.size + " bytes",
    path: req.file.path,
  };
  res.send(imgInfo);
});

module.exports = router;
