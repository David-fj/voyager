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


// CADASTRO

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const conSenha = document.getElementById('consenha').value;
    const inputs = document.querySelectorAll("#registerForm input");
    const submitButton = document.querySelector("#registerForm button");

    if( senha === conSenha ){

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Carregando...";

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, senha })
      });
  
      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          position: 'top-end',
          text: `Usuário cadastrado com sucesso!`,
          background: '#3085d6',
          color: '#fff',
          showConfirmButton: false,
          timer: 1700
    });
        console.log(result);

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        window.location.href = "../Home-logged/index.html";
        
      } else {
        const error = await response.json();
        inputs.forEach(input => {
          input.className = "errado"
        });
        Swal.fire({
          position: 'top-end',
          text: `Erro ${error.error}`,
          background: '#ee5454',
          color: '#fff',
          showConfirmButton: false,
          timer: 1700
    });
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      Swal.fire({
        position: 'top-end',
        text: 'Erro ao cadastrar usuário!',
        background: '#ee5454',
        color: '#fff',
        showConfirmButton: false,
        timer: 1700
  });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Cadastrar";
    }
    } else {
      Swal.fire({
        position: 'top-end',
        text: 'As senhas não condizem!',
        background: '#ee5454',
        color: '#fff',
        showConfirmButton: false,
        timer: 1700
  });
        inputs.forEach(input => {
          input.className = "errado"
        });
    }
  

});

// LOGIN - Márcio nunca duvide dos seus alunos, eu não vou desistir, não por que vc falou que eu iria desistir e sim porque isso é algo que eu quero, mesmo que dê errado, eu fiz!

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('vemail').value;
    const senha = document.getElementById('vsenha').value;
    const inputs = document.querySelectorAll("#loginForm input");
    const submitButton = document.querySelector("#loginForm button");
    submitButton.disabled = true;
    submitButton.textContent = "Carregando...";

  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
  
    const result = await response.json();
    console.log(result)
    if (result.success) {
      Swal.fire({
        position: 'top-end',
        icon: 'sucess',
        background: '#115575',
        showConfirmButton: false,
        timer: 1000
  });
      window.location.href = "../Home-logged/index.html";

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', result.name);
    } else if ( result.error === 'ETIMEDOUT'  ){
      Swal.fire({
      title: 'Servidor fora do ar!',
      text: "Você deseja logar em uma conta Teste?",
      icon: 'warning',
      showCancelButton: true,
      background: '#115575',
      color: '#fff',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
  }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = "../Home-logged/index.html"
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userName", "Teste")
      }
});
  } else {
    Swal.fire({
      position: 'top-end',
      title: 'Email ou senha incorretos!',
      icon: 'error',
      background: '#115575',
      color: '#fff',
      showConfirmButton: false,
      timer: 1000
});
      console.log(result.error)
      submitButton.disabled = false;
      submitButton.textContent = "Entrar";
      inputs.forEach(input => {
        input.className = "errado"
      });
    }
  });

  