const db = require('../models/index');
const User = db.User;

function trazerPessoas(em, sh){
    User.findOne({ where: { 
        email: em,
        senha: sh
    } 
}).then(pessoa => {
    console.log('\n \n \n')
    console.log(pessoa)
});
}

trazerPessoas('teste@gmail.com', 'teste123')