// eslint-disable-next-line no-unused-vars
// When the user submits the form, validade if the file is a pdf
function validateFileTypeFromBrowser(event) {
  // const fileInput = document.getElementById('file');
  // const file = fileInput.files[0];
  // if (file.type !== 'application/pdf') {
  //   alert('Invalid file type (file name is not a pdf)');
  //   event.preventDefault();
  // } else {
  //   // If the file is a pdf, show the loading status
  //   const submitBtn = document.getElementById('submit');
  //   submitBtn.setAttribute('disabled', '');
  //   submitBtn.innerHTML =
  //     "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Carregando...";
  // }
}

const formElem = document.getElementById('form');
formElem.addEventListener('submit', validateFileTypeFromBrowser);
