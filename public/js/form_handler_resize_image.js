const form = document.forms.namedItem("resize-image-form");
const uploadPercentage = document.querySelector(".upload-percentage");

function showUploadStatus(e) {
  form.style.display = "none";
  let percentage = Math.floor((e.loaded / e.total) * 100);
  uploadPercentage.innerHTML = `${percentage}%`;
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

  XHR.open("POST", "http://localhost:3000/api/resizeImage");
  XHR.send(userInputs);
});
