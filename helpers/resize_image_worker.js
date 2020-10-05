const path = require("path");
const uploaded_image_details = require("./uploaded_file_details");
const sharp = require("sharp");
const { ErrorHandler } = require("./errors");
const uploaded_file_url = require("./uploaded_file_url");

const processed_resize_image_req = (req) => {
  return Object.assign(
    {},
    uploaded_image_details(req),
    user_req_details(req),
    resized_image_urls(req)
  );
};

const user_req_details = (req) => {
  check_req_validity(req);
  return {
    outputWidth: Number(req.body.width),
    outputHeight: Number(req.body.height),
    outputFormats: req.body.formats || "jpeg",
  };
};

const check_req_validity = (req) => {
  if (req.body.width != undefined && req.body.height != undefined) {
    return;
  } else {
    throw new ErrorHandler(
      404,
      "Request body contains missing field values. You have not specified the output width or height for the resize operation"
    );
  }
};

const resized_image_urls = (req) => {
  const { outputWidth, outputHeight, outputFormats } = user_req_details(req);
  const newFileName = generate_new_file_name(outputFormats);
  const imageDirectory = path.join(__dirname, "../public/uploads");
  sharp(path.join(imageDirectory, req.file.filename))
    .resize(outputWidth, outputHeight, { fit: "fill", position: "center" })
    .toFormat(outputFormats)
    .toFile(path.join(imageDirectory, newFileName), (err, info) => {});

  return {
    convertedImageUrl: uploaded_file_url(`../public/uploads/${newFileName}`),
  };
};

const generate_new_file_name = (fileExt) => {
  const uniqueSuffix =
    Math.round(Math.random() * 1e9) +
    "-" +
    Date.now() +
    "-" +
    Math.round(Math.random() * 1000);

  return `${uniqueSuffix}.${fileExt}`;
};

module.exports = processed_resize_image_req;
