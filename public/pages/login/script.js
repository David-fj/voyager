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
    event.preventDefault(); // Impede o comportamento padrão do formulário
  
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const conSenha = document.getElementById('consenha').value;

    if( senha === conSenha ){

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, senha })
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Usuário cadastrado com sucesso!');
        console.log(result);
        window.location.href = "../Home-logged/index.html";
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error}`);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      alert('Erro ao cadastrar o usuário.');
    }
    } else {
        alert("As senhas não condizem!")
    }
  

});

// LOGIN - Márcio nunca duvide dos seus alunos, eu não vou desistir, não por que vc falou que eu iria desistir e sim porque isso é algo que eu quero, mesmo que dê errado, eu fiz!

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('vemail').value;
    const senha = document.getElementById('vsenha').value;

    console.log(email)
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
  
    const result = await response.json();
    console.log(result)
    if (result.success) {
      alert('Login bem-sucedido!');
      window.location.href = "../Home-logged/index.html";
    } else {
      alert('Credenciais inválidas script.');
      console.log(result)
    }
  });

  