const dino = document.querySelector(".dino");
const obstaculo = document.querySelector(".obstaculo");

let sprite = 0;
let jump = false;
let walk = true;
let margin = 0;
let fps = 60;
let xd = 0;
let start = false;

dino.style.backgroundImage = "url('../../images/sprite/00_sprite.png')";


function imprimir() {
    function verificarPosicao() {
        const dinoRet = dino.getBoundingClientRect();
        const obstaculoRet = obstaculo.getBoundingClientRect();

        if(Math.abs(dinoRet.top - obstaculoRet.top) < 32 && Math.abs(dinoRet.right - obstaculoRet.left) < 32){
            return true;
        }else {
            return false;
        }
    }
    document.addEventListener('keydown', (event) => {
        if(event.key === " " && !jump){
            walk = false;
            jump = true;
            dino.style.backgroundImage = "url('../../images/sprite/00_sprite.png')"
            margin = 16;
            dino.style.transition = "0.5s";
            dino.style.margin = `0 0 ${margin}rem 1.5rem`;
        }
        start = true;
    })
    if(start){
        obstaculo.style.transition = "2s linear";
        obstaculo.style.display = "flex";
        void obstaculo.offsetWidth;
        obstaculo.style.marginLeft = "-6rem";

        obstaculo.addEventListener('transitionend', () => {
            obstaculo.style.transition = "0s";
            obstaculo.style.display = "none";
            obstaculo.style.marginLeft = "88%";
            obstaculo.style.backgroundImage = `url("../../images/sprite (1)/0${Math.floor(Math.random() * 3)}_sprite (1).png")`
        }) 
        if(jump){
            xd++;
            if(xd == 5){
                walk = true;
                jump = false;
                dino.style.transition = "0s";
                xd = 0;
            }
            if(xd == 3){
                margin = 0;
                dino.style.margin = `0 0 ${margin}rem 1.5rem`;
            }
        }
        if(walk){
            if(sprite == 4){
                sprite = 2;
            }
            dino.style.backgroundImage = `url('../../images/sprite/0${sprite}_sprite.png')`;
            sprite++;
        }
        if(verificarPosicao()){
            console.log("Encostou");
            start = false;
        }
    }
}

setInterval(imprimir, 10000/fps);
