const uploaded_file_url = require("./uploaded_file_url");
const { ErrorHandler } = require("./errors");

const uploaded_file_details = (req) => {
  if (req.file == undefined) {
    throw new ErrorHandler(
      404,
      "You have not selected any image file. Please select an image from your device to sumbmit and try again."
    );
  }
  const file_details = {
    originalFileName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size + " bytes",
    originalFileUrl: uploaded_file_url(req.file.path),
  };
  return file_details;
};

module.exports = uploaded_file_details;
