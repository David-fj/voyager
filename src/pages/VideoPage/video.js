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
