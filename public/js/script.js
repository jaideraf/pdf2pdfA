const formElem = document.getElementById('form');
const fileInput = document.getElementById('file');
const submitBtn = document.getElementById('submit');
// const reloadBtn = document.getElementById('reload');
// if (reloadBtn) {
//   reloadBtn.addEventListener('click', () => window.location.reload());
// }

// When the user submits the form, validate if the file is a pdf

function validateFileFromBrowser(event) {
  const file = fileInput.files[0];
  // if (file.type !== 'application/pdf') {
  //   alert(
  //     `Somente um arquivo no formato PDF é permitido. Certifique-se de que o arquivo selecionado é um PDF.`,
  //   );
  //   event.preventDefault();
  // } else if (file.size > 33554432) {
  //   alert(`O arquivo selecionado ultrapassa o tamanho permitido de 32 MB.`);
  //   event.preventDefault();
  // } else {
  //   // If the file is a pdf, show the loading status
  //   submitBtn.setAttribute('disabled', 'true');
  //   submitBtn.innerHTML = `
  //     <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Aguarde, a conversão pode demorar alguns minutos...
  //   `;

  //   // And show the reload button
  //   // reloadBtn.style.display = 'inline';
  // }
}

if (formElem) {
  formElem.addEventListener('submit', validateFileFromBrowser);
}
