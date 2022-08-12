const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.player');
const tempo = document.querySelector('.timer')
const nomeJogador = localStorage.getItem('Jogador')

const imagens = [
  'mariBracos',
  'mariCanal',
  'mariCareta',
  'mariChapeuBranco',
  'mariChapeuPreto',
  'mariMakeUp',
  'mariNaGrama',
  'mariPiercing',
  'mariQueijoQuente',
  'mariVermelhoPraia'
]

const criarElemento = (tag, className) => {
  const elemento = document.createElement(tag);
  elemento.className = className;
  return elemento;
}

let primeiraCarta = '';
let segundaCarta = '';

const checarFinalJogo = () => {

  const cartasDesabilitadas = document.querySelectorAll('.disable-carta')
  if(cartasDesabilitadas.length === 20) {
    clearInterval(this.loop)
    alert(`Parabens, ${nomeJogador} você venceu! Seu tempo foi ${tempo.innerHTML} segundos.`)
    window.location.href = '../index.html'
  }
}

const checaCartas = () => {
  const primeiraMari = primeiraCarta.getAttribute('data-mari');
  const segundaMari = segundaCarta.getAttribute('data-mari');
  if(primeiraMari === segundaMari) {
    primeiraCarta.firstChild.classList.add('disable-carta')
    segundaCarta.firstChild.classList.add('disable-carta')
    primeiraCarta = '';
    segundaCarta = '';
    checarFinalJogo()
  } else {
    setTimeout(()=> {
      primeiraCarta.classList.remove('revela-carta');
      segundaCarta.classList.remove('revela-carta')
      primeiraCarta = '';
      segundaCarta = '';
    }, 1000)
  }
}

const revelaCarta = ({ target }) => {
  if(target.parentNode.className.includes('revela-carta')) {
    alert('Escolha outra carta. Essa já foi clicada!');
    return;
  }
  if(primeiraCarta === '') {
    target.parentNode.classList.add('revela-carta');
    primeiraCarta = target.parentNode;
  }  else if (segundaCarta === '') {
    target.parentNode.classList.add('revela-carta');
    segundaCarta = target.parentNode;
    checaCartas()
  }
}

const criarCartas = (imagem) => {
  const card = criarElemento('div', 'card')
  const frente = criarElemento('div', 'face frente')
  const costas = criarElemento('div', 'face costas')
  frente.style.backgroundImage = `url('../imagens/${imagem}.jpg')`
  card.appendChild(frente)
  card.appendChild(costas)
  card.addEventListener('click', revelaCarta)
  card.setAttribute('data-mari', imagem)
  return card;
}

const carregarJogo = () => { 
  const duplicaImagens = [...imagens, ...imagens]
  const embaralhar = duplicaImagens.sort(() => Math.random() - 0.5)
  embaralhar.forEach((imagem)=>{
    const carta = criarCartas(imagem)
    grid.appendChild(carta)
  })
}

const iniciarTempo = () => {
  this.loop = setInterval(() => {
    const tempoCorrente = +tempo.innerHTML
    tempo.innerHTML = tempoCorrente + 1
  }, 1000)
}

window.onload = () => {  
  spanJogador.innerHTML = `${nomeJogador} está jogando` 
  carregarJogo()
  iniciarTempo()

}

