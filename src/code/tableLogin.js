const db = require('../models/index');
const User = db.User;

function trazerPessoas(id){
    User.findByPk(id).then(user =>{
        console.log('\n \n \n')
        console.log(JSON.stringify(user))
    })
}

trazerPessoas(1)