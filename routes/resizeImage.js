const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { ErrorHandler } = require("../helpers/errors");
const is_valid_image = require("../helpers/is_valid_image");
const processed_request = require("../helpers/resize_image_worker");

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
  res.send(processed_request(req));
});

module.exports = router;
