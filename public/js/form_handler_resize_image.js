const form = document.forms.namedItem("resize-image-form");

const uploadInfo = document.querySelector(".upload-info");
const uploadPercentage = document.querySelector(".upload-percentage");

const processingInfo = document.querySelector(".processing-info");

const resizedImageInfo = document.querySelector(".resized-image-info");

const originalImageName = document.querySelector(".original-image-name");
const originalImageType = document.querySelector(".original-image-type");
const originalImageURL = document.querySelector(".original-image-url");

const requestedWidth = document.querySelector(".requested-width");
const requestedHeight = document.querySelector(".requested-height");
const requestedFormats = document.querySelector(".requested-formats");

const errorInfo = document.querySelector(".error-info");
const errorMessage = document.querySelector(".error-message");

function show_upload_status(e) {
  form.style.display = "none";
  uploadInfo.style.display = "block";
  let percentage = Math.floor((e.loaded / e.total) * 100);
  uploadPercentage.innerHTML = `${percentage}%`;
}

function show_processing_status() {
  uploadInfo.style.display = "none";
  processingInfo.style.display = "block";
}

function get_formats(formatsArr) {
  return formatsArr.join(", ");
}

function get_element(className) {
  return document.querySelector(`.${className}`);
}

function get_list_element(className) {
  return get_element(className);
}

function get_anchor_element(mainClassName) {
  const className = `${mainClassName}-url`;
  return get_element(className);
}

function write_image_info(imageFormat, resizedImageUrls) {
  const element = get_list_element(imageFormat);
  const anchorEle = get_anchor_element(imageFormat);

  element.style.display = "list-item";
  anchorEle.innerHTML = resizedImageUrls[imageFormat];
  anchorEle.href = resizedImageUrls[imageFormat];
}

function write_resized_image_urls(response) {
  const imageFormats = response.outputFormats;
  const resizedImageUrls = response.resizedImageUrls;

  imageFormats.forEach((imageFormat) => {
    write_image_info(imageFormat, resizedImageUrls);
  });
}

function write_original_file_infos(response) {
  originalImageName.innerHTML = response.originalFileName;
  originalImageType.innerHTML = response.mimetype;
  originalImageURL.innerHTML = response.originalFileUrl;
  originalImageURL.href = response.originalFileUrl;
}

function write_user_req_details(response) {
  requestedWidth.innerHTML = response.outputWidth;
  requestedHeight.innerHTML = response.outputHeight;
  requestedFormats.innerHTML = get_formats(response.outputFormats);
}

function write_resized_image_infos(response) {
  write_original_file_infos(response);
  write_user_req_details(response);
  write_resized_image_urls(response);
}

function show_resized_image_infos(response) {
  processingInfo.style.display = "none";
  write_resized_image_infos(response);
  resizedImageInfo.style.display = "block";
}

function show_server_error_details(response) {
  processingInfo.style.display = "none";
  errorMessage.innerHTML = response.message;
  errorInfo.style.display = "block";
}

function handle_server_response() {
  const response = JSON.parse(this.response);
  const status = this.status;

  if (status == 200) {
    show_resized_image_infos(response);
  } else {
    show_server_error_details(response);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInputs = new FormData(form);

  const XHR = new XMLHttpRequest();

  XHR.onload = handle_server_response;

  XHR.upload.onprogress = show_upload_status;
  XHR.upload.onload = show_processing_status;

  XHR.open("POST", "http://localhost:3000/api/resizeImage");
  XHR.send(userInputs);
});
