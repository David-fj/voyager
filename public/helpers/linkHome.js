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
        deslogar.style.display = "none";
    }
}

mudaLinkHome()
