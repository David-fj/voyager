window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
window.history.pushState(null, "", window.location.href);
}

function nomeUsuario() {
    const realName = localStorage.getItem("userName");

    const nome = document.getElementById('nomeUsuario');
    nome.innerText = realName
}

nomeUsuario()

const logoLink = document.querySelector(".navList a");
const logar = document.querySelector(".logar");
const deslogar = document.querySelector(".deslogar");

deslogar.addEventListener('click', event => {
    event.preventDefault(); // Evita que o logout seja realizado imediatamente

    Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja realmente deslogar?",
        icon: 'warning',
        showCancelButton: true,
        background: '#115575',
        color: '#fff',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deslogar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("isLoggedIn", "false")
            localStorage.setItem("userName", "")
            localStorage.setItem('idUser', "");
            window.location.href = "../login/login.html"
        }
    });
});

logar.addEventListener("click", () => {
    if( localStorage.getItem("isLoggedIn") == "false" ) {
        window.location.href = "../login/login.html"
    }
})

function mudaLinkHome() {
    if (localStorage.getItem("isLoggedIn") == "true"){
        logar.style.display = "none";
        logoLink.setAttribute("href", "#")        
    } else {
        alert("Você não está logado.")
        window.location.href = "../../index.html"
        deslogar.style.display = "none";
    }
}

mudaLinkHome()

// teste

function buscarOsTemas() {
  fetch('../Catalogo/data.json')          //Buscar o .json
      .then(response => response.json())          // se achar o .json pega a resposta
      .then(data => {         //se a resposta for data (porque não vai vim data.json e sim data) ele segue
          const buscarCaixaDeTema = document.querySelector("#temas")          //busca a section onde fica os "card"

          data.map(tema => {          //.map busca dentro do .json cada objeto, o tema pode mudar é tipo variavel
              const cardTema = document.createElement("a")
              cardTema.classList.add("estudos-ref")
              cardTema.href = "../VideoPage/video.html"

              const cardImg = document.createElement("img")
              cardImg.src = tema.icone     //tema.(o atributo do objeto no json)
              cardImg.alt = tema.iconedescricao           //tema.(o atributo do objeto no json)

              const cardDiv = document.createElement("div")
              cardDiv.classList.add("colorbk")

              const cardTitulo = document.createElement("h3")
              cardTitulo.textContent = tema.titulo            //tema.(o atributo do objeto no json)

              const cardDescricao = document.createElement("p")
              cardDescricao.textContent = tema.descricao          //tema.(o atributo do objeto no json)

              buscarCaixaDeTema.appendChild(cardTema)         //transforma o cardTema no "filho" da section

              cardTema.appendChild(cardImg)           //transforma o cardImg no "filho" da cardTema
              cardTema.appendChild(cardDiv)           //transforma o cardDiv no "filho" da cardTema

              cardDiv.appendChild(cardTitulo)         //transforma o cardTitulo no "filho" da cardDiv
              cardDiv.appendChild(cardDescricao)         //transforma o cardDescricao no "filho" da cardDiv
          })
      })

}

buscarOsTemas()

let i = 0;
const slidesToShow = 7;

function moveSlide(step) {
  const slides = document.querySelectorAll('#temas a');
  const totalSlides = slides.length;

  i = (i + step + totalSlides) % totalSlides;

  const offset = -i * (100 / slidesToShow);
  document.querySelector('#temas').style.transform = `translateX(${offset}%)`;
}

document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));


/*Tabela*/

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/scores');
      const data = await response.json();
      console.log(data)
      
      const tableBody = document.querySelector('#pontuacaoTodos tbody');
      tableBody.innerHTML = ''; // Limpa o conteúdo existente
      
      data.forEach((item, i) => {
        let c = i + 1;
        const linha = `
        <tr>
          <td>${c }</td>
          <td>${item.userName}</td>
          <td>${item.totalScore}</td>
          </tr>
          `
        tableBody.innerHTML += linha;
      });
    } catch (error) {
      console.error('Erro ao carregar pontuações:', error);
    }
  });
