const pontuacao = document.querySelector(".pontuacao");
pontuacao.style.left = `${900 + ((window.screen.width - 960)/2)}px`;
pontuacao.style.top = `${200}px`;

const popUp = document.querySelector(".popUp")

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Carrega a imagem da spritesheet do dinossauro
let dinoImage = new Image();
dinoImage.src = '../../images/sprite/spritesheet.jpg'; // Caminho da spritesheet
// dinoImage.src = '../../images/sprite/monkey.png'; // Caminho da spritesheet

let cactusImage = new Image();
cactusImage.src = '../../images/sprite/spritessheet3.jpg';



let dino = {
  x: 50,
  y: 160 - 42,
  width: 32,
  height: 32,
  velocityY: 0,
  jumpPower: -10,
  gravity: 0.5,
  isJumping: false,
  frameX: 0,    // Controle do quadro atual na spritesheet
  frameCount: 3 // Número total de quadros na spritesheet
};

let cactus = {
    x: canvas.width,
    y: 160 - 42, // Cacto no chão
    width: 32,
    height: 32,
    speed: 2.5,
    frameX: 0,    // Controle do quadro atual na spritesheet
    frameCount: 5 // Número total de quadros na spritesheet
};

let gameOver = false;
let score = 0;
let gameStarted = false;
let animationFrame = 0;  // Contador de frames para controlar a animação

// Desenha o dinossauro animado usando a spritesheet
function drawDino() {
  // Cálculo da largura de cada quadro (se a spritesheet tem 4 quadros, divida a largura total por 4)
  let spriteWidth = dinoImage.width / dino.frameCount;

  // Desenha o quadro atual da spritesheet no canvas
  ctx.drawImage(
    dinoImage,
    dino.frameX * spriteWidth,  // Posição X no spritesheet
    0,                          // Posição Y no spritesheet (se for uma linha única)
    spriteWidth,                // Largura do quadro individual
    dinoImage.height,           // Altura do quadro individual
    dino.x, dino.y,             // Posição no canvas
    dino.width, dino.height     // Tamanho no canvas
  );

  // Atualiza o quadro da animação a cada N frames
  if (animationFrame % 10 === 0) {  // Muda o quadro a cada 10 frames
    dino.frameX = (dino.frameX + 1) % dino.frameCount;  // Cicla pelos quadros
  }
}

function drawCactus() {
//   ctx.fillStyle = 'brown';
//   ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
  let spriteWidth = cactusImage.width / cactus.frameCount;

  ctx.drawImage(
    cactusImage,
    cactus.frameX * spriteWidth,  // Posição X no spritesheet
    0,                          // Posição Y no spritesheet (se for uma linha única)
    spriteWidth,                // Largura do quadro individual
    cactusImage.height,           // Altura do quadro individual
    cactus.x, cactus.y,             // Posição no canvas
    cactus.width, cactus.height      // Tamanho no canvas
  );

  // Atualiza o quadro da animação a cada N frames
  if (animationFrame % 10 === 0) {  // Muda o quadro a cada 10 frames
    cactus.frameX = (cactus.frameX + 1) % cactus.frameCount;  // Cicla pelos quadros
  }
}


function handleJump() {
  if (dino.isJumping) {
    dino.velocityY += dino.gravity;
    dino.y += dino.velocityY;
  }

  if (dino.y + dino.height >= 150) {
    dino.y = 150 - dino.height;
    dino.isJumping = false;
    dino.velocityY = 0;
  }
}


function margem2() {
  return dino.width * 0.50
}
let margemDeErroDino = margem2()
function margem3() {
  return dino.height * 0.80
}
let margemVerticalDeErroDino = dino.height * 0.80
function margem1() {
  return cactus.width * 0.40
}
let margemDeErro = margem1()

function handleCollision() {
  
  console.log(cactus.width)
  if (
    dino.x < cactus.x + cactus.width - margemDeErro &&
    dino.x + dino.width > cactus.x + margemDeErroDino &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y + margemVerticalDeErroDino
  ) {
    gameOver = true;
  }
}

function resetGame() {
  dino.y = 150;
  dino.velocityY = 0;
  cactus.x = canvas.width;
  score = 0;
  pontuacao.innerHTML = `${Math.floor(score).toString().padStart(3, '0')}`;
  gameOver = false;
  gameStarted = false;
}

function updateGame() {
  if (gameOver) {
    function verificarSelecao() {
        const selecionado = document.querySelector("input[name='optionsSelect']:checked")

        if(selecionado) {
            return selecionado.value;
        }
        return -1;
    }

    function desmarcarTodos() {
        const radios = document.querySelectorAll("input[name='optionsSelect']:checked");
        radios.forEach(radio => radio.checked = false);
      }

    const popUp = document.querySelector(".popUp");
    popUp.style.display = "flex";
    let pergunta;
    let pass = false;
    fetch('./perguntas.json')
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        let aleatorio = Math.floor(Math.random() * 18);
        pergunta = data.questions[aleatorio];
        const titulo = document.querySelector(".titulo");
        const optionsLi = document.querySelectorAll(".descricao");
        const topico = document.querySelector(".topico");
        titulo.innerHTML = `${pergunta.question}`;
        for(let i = 0; i < 4; i++) {
            optionsLi[i].innerHTML = `${pergunta.options[i]}`;
        }
        topico.innerHTML = `Tópico: ${pergunta.topic}`
        pass = true;
    })
        .catch(error => {
        console.error('Erro:', error);
    });
    const button = document.querySelector(".responder");

    let respondido = false;
    let erro = false;
    const lis = document.querySelectorAll(".opcao");
    button.addEventListener('click', () => {
        if(pass){
        let valor = verificarSelecao();
        if(!respondido){
            if(valor != -1){
                if(pergunta.alter != valor) {
                    lis[valor].setAttribute('id', 'vermelho');
                    erro = true;
                }
            lis[pergunta.alter].setAttribute('id','verde');
            button.innerHTML = "Continuar";
            respondido = true;
            console.log(pontuacao)
            }
        }else {
            desmarcarTodos();
            if(erro){
                lis[valor].removeAttribute('id', 'vermelho'); 
            }
            lis[pergunta.alter].removeAttribute('id', 'verde');
            respondido = false;
            pass = false;
            button.innerHTML = "Responder"
            popUp.style.display = "none";

            async function saveScore(score) {
              const userId = localStorage.getItem('idUser'); // Supondo que você já tenha o userId armazenado no localStorage
            
              const response = await fetch('/api/save-score', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ userId, score })
              });
            
              const result = await response.json();
            
              if (response.ok) {
                  console.log(result);
              } else {
                  console.error('Erro ao salvar a pontuação:', result.error);
              }
            }
            
            function confirmSaveScore(score) {
              const userId = localStorage.getItem('idUser');
              if ( userId === "" ){
                Swal.fire('Não salvo!', 'Sua pontuação não foi salva, faça login para salvar', 'info');
              } else{
              Swal.fire({
                title: 'Você deseja salvar sua pontuação?',
                text: `Sua pontuação é ${score}.`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sim, salvar!',
                cancelButtonText: 'Não, cancelar',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Salvo', 'Sua pontuação foi salva', 'info');
                  saveScore(score);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire('Cancelado', 'Sua pontuação não foi salva', 'info');
                }
              });
              }
            }
          
            // Exemplo de uso:
            // Chame essa função com a pontuação que deseja salvar
            let gameScore = score;
            if ( erro === false){
              gameScore = gameScore + 10
            }
            // saveScore(gameScore)
            confirmSaveScore(gameScore);

            // Exemplo de uso: salvar a pontuação após o jogo
            resetGame();
        }
    }
    })
    //resetGame();
  } else {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cactus.x -= (cactus.speed + (Math.floor(score/5)));

  function tamanhoCactus(){
    return Math.floor(Math.random() * 48) + 32
  }
  

  let tamanho = tamanhoCactus();

  if (cactus.x + cactus.width < 0) {
    cactus.x = canvas.width;
    cactus.width = tamanho;
    cactus.height = tamanho;

    cactus.y = 160 - (tamanho + 10)
    score++;
    pontuacao.innerHTML = `${Math.floor(score).toString().padStart(3, '0')}`
  }

  drawCactus();
  drawDino();

  handleJump();
  handleCollision();

  animationFrame++;  // Incrementa o contador de frames para a animação

  if (gameStarted) {
    requestAnimationFrame(updateGame);
  }
}
}

window.addEventListener('keydown', function (e) {
    if (!dino.isJumping && gameStarted) {
        dino.isJumping = true;          // Inicia o pulo
        dino.velocityY = dino.jumpPower; // Define a velocidade de pulo
    }
    if (!gameStarted) {
      gameStarted = true;
      updateGame();
    }
});

// Inserir pontuacao


