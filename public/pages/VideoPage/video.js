//Função pra expandir os temas
let temaExpandir = document.getElementsByClassName("tema");
let contadorDeTemas;

for (
  contadorDeTemas = 0;
  contadorDeTemas < temaExpandir.length;
  contadorDeTemas++
) {
  temaExpandir[contadorDeTemas].addEventListener("click", function () {
    this.classList.toggle("active");
    const menuExpansivel = this.nextElementSibling;
    if (menuExpansivel.style.display === "block") {
      menuExpansivel.style.display = "none";
    } else {
      menuExpansivel.style.display = "block";
    }
  });
}


window.addEventListener('scroll', function() {
  const navHeight = document.querySelector('nav').offsetHeight;
  const aside = document.querySelector('aside');
  const scrollTop = window.scrollY;
  
  if (scrollTop > navHeight) {
      aside.style.position = 'fixed';
      aside.style.transform = "translateY(-6.0625rem)";
  } else {
      aside.style.position = 'fixed';
      aside.style.transform = "translateY(0)";
  }
});

const fechar = document.querySelector(".fechar") 
fechar.onclick = () => {
  console.log("Pêssego")
  const menu = document.querySelector("aside")
  const divVideo = document.querySelector(".videoAula .videozao")
  const voltaMenu = document.querySelector(".voltamenu")
  if ( voltaMenu.style.display = "none" ) {
    menu.style.display = "none"
    divVideo.style.width = "100%"
    voltaMenu.style.display = "block"
    }
}

const voltaMenu = document.querySelector(".voltamenu")
voltaMenu.onclick = () => {
  console.log("Pêssego")
  const menu = document.querySelector("aside")
  const divVideo = document.querySelector(".videoAula .videozao")
  menu.style.display = "block"
  divVideo.style.width = "80%"
  voltaMenu.style.display = "none"
}

/*Trocar aulas*/
const aulaCos = document.querySelectorAll(".cosmologia li");

const aulaSis = document.querySelectorAll(".sistema li");

const aulaEstrelas = document.querySelectorAll(".estrelas li");

const aulaGalaxia = document.querySelectorAll(".galaxia li");

const aulaExoplanetas = document.querySelectorAll(".exoplanetas li");

const aulaInstrumentacaoAstronomica = document.querySelectorAll(".instrumentacao li");

const iframe = document.querySelector("iframe")

const resumo = document.querySelector(".videozao p")

function buscarOsTemas() {
  fetch('data.json')          //Buscar o .json
      .then(response => response.json())          // se achar o .json pega a resposta
      .then(data => {
          aulaCos.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaCos).indexOf(elementoClicado);
              iframe.src = `${data.Cosmologia[clickArray]}`
              resumo.innerText = data.Textocos
              console.log(elementoClicado, clickArray)

            })
          })
          
          aulaSis.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaSis).indexOf(elementoClicado);
              iframe.src = `${data.SistemaSolar[clickArray]}`
              resumo.innerText = data.Textosis
              console.log(elementoClicado, clickArray)
            })
          })
          
          aulaEstrelas.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaEstrelas).indexOf(elementoClicado);
              iframe.src = `${data.Estrelas[clickArray]}`
              resumo.innerText = data.Textoestrelas
              console.log(elementoClicado, clickArray)
            })
          })

          aulaGalaxia.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaGalaxia).indexOf(elementoClicado);
              iframe.src = `${data.Galaxias[clickArray]}`
              resumo.innerText = data.Textogal
              console.log(elementoClicado, clickArray)
            })
          })

          // aulaGalaxia.forEach(aula => {
          //   aula.addEventListener('click', (event) => {
          //     const elementoClicado = event.target;
          //     const clickArray = Array.from(aulaGalaxia).indexOf(elementoClicado);
          //     iframe.src = `${data.Galaxias[clickArray]}`
          //     resumo.innerText = data.Textogalaxia
          //     console.log(elementoClicado, clickArray)
          //   })
          // })

          aulaExoplanetas.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaExoplanetas).indexOf(elementoClicado);
              iframe.src = `${data.Exoplanetas[clickArray]}`
              resumo.innerText = data.Textoexo
              console.log(elementoClicado, clickArray)
            })
          })

          aulaInstrumentacaoAstronomica.forEach(aula => {
            aula.addEventListener('click', (event) => {
              const elementoClicado = event.target;
              const clickArray = Array.from(aulaInstrumentacaoAstronomica).indexOf(elementoClicado);
              iframe.src = `${data.InstrumentacaoAstronomica[clickArray]}`
              resumo.innerText = data.Textoinstru
              console.log(elementoClicado, clickArray)
            })
          })
        })
        
}

buscarOsTemas()


function verificarTema(){
  if ( localStorage.getItem('tema') === 'estudobk' ) {
    const painel = document.querySelectorAll('.panel')
    painel[0].style.display  = 'block'
    temaExpandir[0].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  if ( localStorage.getItem('tema') === 'estudobk1' ) {
    const painel = document.querySelectorAll('.panel')
    painel[1].style.display  = 'block'
    temaExpandir[1].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  if ( localStorage.getItem('tema') === 'estudobk2' ) {
    const painel = document.querySelectorAll('.panel')
    painel[2].style.display  = 'block'
    temaExpandir[2].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  if ( localStorage.getItem('tema') === 'estudobk3' ) {
    const painel = document.querySelectorAll('.panel')
    painel[3].style.display  = 'block'
    temaExpandir[3].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  if ( localStorage.getItem('tema') === 'estudobk4' ) {
    const painel = document.querySelectorAll('.panel')
    painel[4].style.display  = 'block'
    temaExpandir[4].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  if ( localStorage.getItem('tema') === 'estudobk5' ) {
    const painel = document.querySelectorAll('.panel')
    painel[5].style.display  = 'block'
    temaExpandir[5].classList.add('active')

    function trocaLink() {
      fetch('data.json')          //Buscar o .json
          .then(response => response.json())          // se achar o .json pega a resposta
          .then(data => {
                  iframe.src = `${data.Cosmologia[0]}`
                  
            })
            
          }
          trocaLink()
  }
  localStorage.removeItem('tema')
}

verificarTema()