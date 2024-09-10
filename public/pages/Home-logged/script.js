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

deslogar.addEventListener("click", () => {
    if( localStorage.getItem("isLoggedIn") == "true" ) {
        window.location.href = "../login/login.html"
        localStorage.setItem("isLoggedIn", "false")
        localStorage.setItem("userName", "")
    }
})

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

function showCustomAlert(message, onConfirm, onCancel) {
    const modal = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const cancelBtn = document.getElementById("cancelBtn");
    const okBtn = document.getElementById("okBtn");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
  
    // Define a mensagem no modal
    alertMessage.textContent = message;
  
    // Exibe o modal
    modal.style.display = "block";
  
    // Quando o usuário clicar no "OK"
    okBtn.onclick = function() {
      modal.style.display = "none";
      if (onConfirm) onConfirm();
    }
  
    // Quando o usuário clicar em "Cancelar"
    cancelBtn.onclick = function() {
      modal.style.display = "none";
      if (onCancel) onCancel();
    }
  
    // Quando o usuário clicar no "X"
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    // Quando o usuário clicar fora do modal
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }
  
  // Exemplo de uso
  document.getElementById('someButton').addEventListener('click', () => {
    showCustomAlert('Você realmente deseja continuar?', 
      function() { 
        alert('Usuário clicou em OK!'); 
      }, 
      function() { 
        alert('Usuário clicou em Cancelar!'); 
      }
    );
  });