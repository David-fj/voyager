function mudarParaEntrar() {
    const mainLogin = document.querySelector(".login")
    const mainCadastro = document.querySelector(".entrar")

    mainLogin.style.display = "none"
    mainCadastro.style.display = "block"
}

function mudarParaCadastro() {
    const mainLogin = document.querySelector(".login")
    const mainCadastro = document.querySelector(".entrar")

    mainLogin.style.display = "block"
    mainCadastro.style.display = "none"
}

if(localStorage.getItem("loginPage") == 0) {
    mudarParaEntrar();
} else {
    mudarParaCadastro();
}
localStorage.removeItem("loginPage")

const entrar = document.querySelector(".conta")
const cadastro = document.querySelector(".conta1")

entrar.addEventListener("click", mudarParaEntrar)
cadastro.addEventListener("click", mudarParaCadastro)


