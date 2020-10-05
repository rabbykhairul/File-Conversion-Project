const path = require("path");
const uploaded_image_details = require("./uploaded_file_details");
const { ErrorHandler } = require("./errors");

const processed_resize_image_req = (req) => {
  return Object.assign({}, uploaded_image_details(req), user_req_details(req));
};

const user_req_details = (req) => {
  check_req_validity(req);
  return {
    outputWidth: Number(req.body.width),
    outputHeight: Number(req.body.height),
    outputFormats: req.body.formats,
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

module.exports = processed_resize_image_req;
