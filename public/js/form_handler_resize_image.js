const form = document.forms.namedItem("resize-image-form");
const uploadInfo = document.querySelector(".upload-info");
const uploadPercentage = document.querySelector(".upload-percentage");
const processingInfo = document.querySelector(".processing-info");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInputs = new FormData(form);

  const XHR = new XMLHttpRequest();

  XHR.onload = function () {
    const serverResponse = JSON.parse(XHR.response);
    console.log(serverResponse);
  };

  XHR.upload.onprogress = show_upload_status;
  XHR.upload.onload = show_processing_status;

  XHR.open("POST", "http://localhost:3000/api/resizeImage");
  XHR.send(userInputs);
});
