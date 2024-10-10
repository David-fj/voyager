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

// document.querySelector('#registerForm button').addEventListener('click', async (ev) => {
//   ev.preventDefault();
//   const submitButton = document.querySelector("#registerForm button");
//   submitButton.disabled = true;
//   submitButton.textContent = "Carregando...";

//   const popUp = document.querySelector('.popUpVerification')
//   popUp.style.display = 'block'

//   const email = document.getElementById('email').value;

//   const response = await fetch('/api/confirm', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email })
//   });
//   console.log(response.ok)

// });
// // document.getElementById('registerForm').addEventListener('submit', async (event) => {
// document.getElementById('inputs').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   console.log("olaaaa")
//   let cod = '';
  

//     const button = document.querySelector(".submit")
//     button.addEventListener('click', event => {
//       const inputForCode = document.querySelectorAll(".input")
//       let valor;
//         for (let i = 1; i <= inputForCode.length; i++) {
//           valor = inputForCode[i - 1].value.toString();
//           cod += valor
//         }
//     })
  
//     const name = document.getElementById('nome').value;
//     const email = document.getElementById('email').value;
//     const senha = document.getElementById('senha').value;
//     const conSenha = document.getElementById('consenha').value;
//     const inputs = document.querySelectorAll("#registerForm input");
//     const submitButton = document.querySelector("#registerForm button");

//     if( senha === conSenha ){

//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, email, senha, cod })
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         Swal.fire({
//           position: 'top-end',
//           text: `Usuário cadastrado com sucesso!`,
//           background: '#3085d6',
//           color: '#fff',
//           showConfirmButton: false,
//           timer: 1700
//     });

//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('userName', name);
//         localStorage.setItem('idUser', result.id);
//         window.location.href = "../Home-logged/index.html";
        
//       } else {
//         const error = await response.json();
//         inputs.forEach(input => {
//           input.className = "errado"
//         });
//         Swal.fire({
//           position: 'top-end',
//           text: `Erro ${error.error}`,
//           background: '#ee5454',
//           color: '#fff',
//           showConfirmButton: false,
//           timer: 1700
//     });
//       }
//     } catch (error) {
//       console.error('Erro ao fazer a requisição:', error);
//       Swal.fire({
//         position: 'top-end',
//         text: 'Erro ao cadastrar usuário!',
//         background: '#ee5454',
//         color: '#fff',
//         showConfirmButton: false,
//         timer: 1700
//   });
//     } finally {
//       submitButton.disabled = false;
//       submitButton.textContent = "Cadastrar";
//     }
//     } else {
//       Swal.fire({
//         position: 'top-end',
//         text: 'Cadastro incorreto!',
//         background: '#ee5454',
//         color: '#fff',
//         showConfirmButton: false,
//         timer: 1700
//   });
//         inputs.forEach(input => {
//           input.className = "errado"
//         });
//     }
  

// });

document.querySelector('#registerForm button').addEventListener('click', async (ev) => {
  ev.preventDefault();
  const submitButton = document.querySelector("#registerForm button");
  submitButton.disabled = true;
  submitButton.textContent = "Carregando...";

  const popUp = document.querySelector('.popUpVerification');
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('/api/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      popUp.style.display = 'block';
      console.log("E-mail enviado com sucesso");
    } else {
      console.error('Erro ao enviar o e-mail');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Cadastrar";
  }
});

// Evento para registrar o usuário após inserir o código
document.getElementById('inputs').addEventListener('submit', async (event) => {
  event.preventDefault();
  let cod = '';
  const inputForCode = document.querySelectorAll(".input");
  inputForCode.forEach(input => cod += input.value);

  const name = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const conSenha = document.getElementById('consenha').value;
  const submitButton = document.querySelector("#registerForm button");

  console.log('Dados enviados:', { name, email, senha, cod });
  if (senha === conSenha) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, senha, cod })
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

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        localStorage.setItem('idUser', result.id);
        window.location.href = "../Home-logged/index.html";
      } else {
        const error = await response.json();
        Swal.fire({
          position: 'top-end',
          text: `Erro: ${error.error}`,
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
      text: 'Senhas não coincidem!',
      background: '#ee5454',
      color: '#fff',
      showConfirmButton: false,
      timer: 1700
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
    if (result.success) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
  });
      window.location.href = "../Home-logged/index.html";

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', result.name);
      localStorage.setItem('idUser', result.userId);
  } else {
    Swal.fire({
      position: 'top-end',
      title: 'Email ou senha incorretos!',
      icon: 'error',
      showConfirmButton: false,
      timer: 1000
});
      submitButton.disabled = false;
      submitButton.textContent = "Entrar";
      inputs.forEach(input => {
        input.className = "errado"
      });
    }
  });

/*VERIFICAÇÃO*/
const inputs = document.getElementById('inputs')
inputs.addEventListener('input', event => {
  const val = event.target.value

  if(isNaN(val)){
    target.value = ""
    return;
  }

  if( val != "" ){
    const next = event.target.nextElementSibling;
    next.focus()
  }
})

inputs.addEventListener('keyup', event => {
  const target = event.target
  const key = event.key.toLowerCase()
  if (key == "backspace" || key == "delete") {
    event.target.value = "";
    const prev = target.previousElementSibling;
    prev.focus();
    return;
  }
})