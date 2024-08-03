//Oque está aqui é teste, pode ou não ser usado

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {                      //
    acc[i].addEventListener("click", function() {       //
        this.classList.toggle("active");                // Sistema
        var panel = this.nextElementSibling;            // pra
        if (panel.style.display === "block") {          // expandir
            panel.style.display = "none";               // o
        } else {                                        // menu
            panel.style.display = "block";              // latera
        }                                               // de aulas
    });                                                 // e temas
}                                                       //


//Apenas para teste