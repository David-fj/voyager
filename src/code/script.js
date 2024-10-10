const crypto = require('crypto');
const nodemailer = require('nodemailer');
const input = require("prompt-sync")();

const configEmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'voyageredutec@gmail.com',
        pass: 'cbpooqysuzoamvnj'
    }
});

function criaToken() {
    return crypto.randomInt(100000, 999999).toString()
}

const codigo = Number(criaToken())

configEmail.sendMail({
    from: 'Voyager <voyageredutec@gmail.com>',
    to: 'ujhafsuyprogramy@gmail.com',
    subject: 'teste de confirmação',
    html: `<h1>codigo de confirmação</h1> <p>Esse é seu código: ${codigo}</p>`,
    text: `Código de confirmação Codigo: ${codigo}`
})
.then(() => confirmar())
.catch((err) => console.log('Erro ao enviar, tente novamente: ', err));

function confirmar() {
    let resposta = Number(input('Qual o código?'))
    if (resposta === codigo) {
        console.log('Acesso liberado')
    } else {
        console.log('Código errado')
        confirmar()
    }
}
