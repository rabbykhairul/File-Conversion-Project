const path = require("path");
const { ErrorHandler } = require("./errors");

function is_valid_image(file, cb) {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const fileMime = file.mimetype;

  const imageTypes = [
    ".apng",
    ".bmp",
    ".gif",
    ".ico",
    ".cur",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".tif",
    ".tiff",
    ".webp",
  ];
  const mimetypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/x-icon",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/webp",
  ];

  if (imageTypes.includes(fileExt) && mimetypes.includes(fileMime)) {
    return cb(null, true);
  } else {
    return cb(
      new ErrorHandler(
        404,
        "The file selected in the image field is not an image. Please try again with an image file."
      )
    );
  }
}

module.exports = is_valid_image;
