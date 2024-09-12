const logoLink = document.querySelector(".navList a");
const logar = document.querySelector(".logar");
const deslogar = document.querySelector(".deslogar");

deslogar.addEventListener('click', event => {
    event.preventDefault();

    Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja realmente deslogar?",
        icon: 'warning',
        background: "#000",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deslogar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../login/login.html"
            localStorage.setItem("isLoggedIn", "false")
            localStorage.setItem("userName", "")
            localStorage.setItem('idUser', "");
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
        logoLink.setAttribute("href", "../Home-logged/index.html")        
    } else {
        deslogar.style.display = "none";
    }
}

mudaLinkHome()
