const form = document.forms.namedItem("resize-image-form");
const uploadInfo = document.querySelector(".upload-info");
const uploadPercentage = document.querySelector(".upload-percentage");
const processingInfo = document.querySelector(".processing-info");

function showUploadStatus(e) {
  form.style.display = "none";
  uploadInfo.style.display = "block";
  let percentage = Math.floor((e.loaded / e.total) * 100);
  uploadPercentage.innerHTML = `${percentage}%`;
}

function showProcessingStatus() {
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

  XHR.onerror = function () {
    const serverResponse = JSON.parse(XHR.response);
    console.log(serverResponse);
  };

  XHR.upload.onprogress = showUploadStatus;
  XHR.upload.onload = showProcessingStatus;

  XHR.open("POST", "http://localhost:3000/api/resizeImage");
  XHR.send(userInputs);
});
