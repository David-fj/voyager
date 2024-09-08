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
