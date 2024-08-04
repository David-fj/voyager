//Função pra expandir os temas
var temaExpandir = document.getElementsByClassName("tema");
var contadorDeTemas;

for (contadorDeTemas = 0; contadorDeTemas < temaExpandir.length; contadorDeTemas++) {
    temaExpandir[contadorDeTemas].addEventListener("click", function() {
        this.classList.toggle("active");
        var menuExpansivel = this.nextElementSibling;
        if (menuExpansivel.style.display === "block") {
            menuExpansivel.style.display = "none";
        } else {
            menuExpansivel.style.display = "block";
        }
    });
}