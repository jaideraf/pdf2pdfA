const formElem = document.getElementById('form');
const fileInput = document.getElementById('file');
const submitBtn = document.getElementById('submit');
const fileSizeLimit = 33554432; // 32MB

// When the user submits the form, validate if the file is a pdf
// and if it's not bigger than 32MB

function validateFileFromBrowser(event) {
  const file = fileInput.files[0];
  if (file.type !== 'application/pdf') {
    alert(
      `Somente um arquivo no formato PDF é permitido. Certifique-se de que o arquivo selecionado é um PDF.`,
    );
    event.preventDefault();
  } else if (file.size > fileSizeLimit) {
    alert(
      `O arquivo selecionado ultrapassa o tamanho máximo permitido de 32 MB.`,
    );
    event.preventDefault();
  } else {
    // If the file is a pdf, show the loading status
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.innerHTML = `
      <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Aguarde, a conversão pode demorar alguns minutos...
    `;
  }
}

if (formElem) {
  formElem.addEventListener('submit', validateFileFromBrowser);
}
