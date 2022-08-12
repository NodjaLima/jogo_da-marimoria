const nomeInput = document.querySelector('.login-input')
const botaoPlay = document.querySelector('.login-button')
const form = document.querySelector('.login-form')

function validaInput({ target }) {

 if (target.value.length >= 3) {
  botaoPlay.removeAttribute('disabled')
 } else {
  botaoPlay.setAttribute('disabled', '')
 };

}

function enviaFormulario(evento) {
  evento.preventDefault();

  localStorage.setItem("Jogador", nomeInput.value)
  window.location = 'pages/game.html'
}

nomeInput.addEventListener('input', validaInput)
form.addEventListener('submit', enviaFormulario)


