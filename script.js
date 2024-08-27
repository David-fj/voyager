const perguntas = document.querySelectorAll('.perguntas div button');

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