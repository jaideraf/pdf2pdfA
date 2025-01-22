/// When the user clicks on the submit button, show the loading status
// eslint-disable-next-line no-unused-vars
function submitLoading() {
  const submitBtn = document.getElementById('submit');
  submitBtn.setAttribute('disabled', '');
  submitBtn.innerHTML =
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Carregando...";
}

function validateFileTypeFromBrowser(event) {
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];
  if (file.type !== 'application/pdf') {
    alert('Invalid file type (file name is not a pdf)');
    event.preventDefault();
  }
}

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', validateFileTypeFromBrowser);
