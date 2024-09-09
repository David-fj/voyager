const dino = document.querySelector(".dino");

let sprite = 0;
let jump = false;
let walk = true;
let margin = 0;
let coeficiente = 0;

dino.style.backgroundImage = "url('../../images/sprite/02_sprite.png')";


function imprimir() {
    document.addEventListener('keydown', (event) => {
        if(event.key === " " && !jump){
            walk = false;
            jump = true;
            dino.style.backgroundImage = "url('../../images/sprite/00_sprite.png')"
            coeficiente = 5;
        }
    })
    if(jump){
        margin += coeficiente;
        if(coeficiente > 0)
            coeficiente--;
        else
            coeficiente++;
        console.log(margin, coeficiente)
        if(margin == 12){
            coeficiente = -5;
        }
        if(margin == 0){
            walk = true;
            jump = false;
        }
        dino.style.margin = `0 0 ${margin}rem 1.5rem`;
    }
    if(walk){
        if(sprite == 4){
            sprite = 2;
        }
        dino.style.backgroundImage = `url('../../images/sprite/0${sprite}_sprite.png')`;
        sprite++;
    }
}

setInterval(imprimir, 10000/60);