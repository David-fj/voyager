const perguntas = document.querySelectorAll('.perguntas div button');
let c = 0;
for (let i = 0; i < perguntas.length; i++) {
  perguntas[i].addEventListener("click", () => {
    const paragrafos = document.querySelectorAll('.perguntas div div');
    const paragrafo = paragrafos[i].lastElementChild;
    const image = perguntas[i].firstElementChild;

    if (paragrafo.classList.contains('ativo')) {
      paragrafo.classList.remove('ativo');
      image.classList.remove('rodar');
    } else {
      for (let j = 0; j < paragrafos.length; j++) {
        paragrafos[j].lastElementChild.classList.remove('ativo');
        perguntas[j].firstElementChild.classList.remove('rodar');
      }
      paragrafo.classList.add('ativo');
      image.classList.add('rodar');
    }
  });
}

const entrarButton = document.querySelector(".entrar");
const cadastroButton = document.querySelector(".b-cadastro");

entrarButton.addEventListener('click', () => {
  localStorage.removeItem("loginPage");
  localStorage.setItem("loginPage", 0);
})

cadastroButton.addEventListener('click', () => {
  localStorage.removeItem("loginPage");
  localStorage.setItem("loginPage", 1);
})

const temas = document.querySelectorAll('.color-aling-planet ul li')
temas.forEach(tema => {
  tema.addEventListener('click', guardaTema)

  function guardaTema(){
    localStorage.setItem('tema', tema.className)
  }
})