// eslint-disable-next-line no-unused-vars

const formElem = document.getElementById('form');
const fileInput = document.getElementById('file');
const submitBtn = document.getElementById('submit');
const reloadBtn = document.getElementById('reload');

// When the user submits the form, validade if the file is a pdf

function validateFileTypeFromBrowser(event) {
  const file = fileInput.files[0];
  if (file.type !== 'application/pdf') {
    alert(
      `Somente um arquivo no formato PDF é permitido.
      Certifique-se de que o arquivo selecionado é um PDF.`,
    );
    event.preventDefault();
  } else {
    // If the file is a pdf, show the loading status
    submitBtn.setAttribute('disabled', '');
    submitBtn.innerHTML =
      "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Carregando...";
    reloadBtn.style.display('inline');
  }
}

formElem.addEventListener('submit', validateFileTypeFromBrowser);
reloadBtn.addEventListener('click', () => window.location.reload());
