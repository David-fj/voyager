const express = require('express');
const router = express.Router();
const { User, Runs, Verifications, Emaild, sequelize } = require('../models');
const { getUsersWithScores } = require('../code/tableLogin')
const bcrypt = require('bcryptjs');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { error } = require('console');
const { where } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { type } = require('os');

// Rota - Confirmação de Gmail

// VERIFIQUEDE

router.post('/confirm', async (req, res) => {
  const { email } = req.body;
  // Selecionar o email "voyager", pelo que eu entendi
  // const [emailConfig] = await Emaild.findAll({
  //   attributes: ['host', 'port', 'secure', 'user', 'pass'],
  //   where: {id: 1}
  // })
  const [emailConfig] = await sequelize.query('SELECT host, port, secure, user, pass FROM Emailds WHERE id = 1', {
    type: QueryTypes.SELECT,
  });

  // Não entendi muito bem isso aqui (mas acho q so esta pegando os atributos do email, so isso)
  const { host, port, secure, user, pass } = emailConfig;
  console.log(emailConfig);
  if (!email) {
    return res.status(400).json({ error: 'Email não fornecido' });
  }
  
  const codigoVerificacao = crypto.randomInt(100000, 999999).toString();
  // Na tabela de "Verifications" vai criar um bagulho novo no banco de dados
  // Fiquei com um pouco de dúvida no "email," não entendi o que ele estaria pegando
  // await Verifications.create({
  //   email,
  //   codigo: codigoVerificacao
  // });
  await sequelize.query("INSERT INTO Verifications (email, codigo, createdAt, updatedAt) VALUES (?, ?, now(), now())", {
    replacements: [email, codigoVerificacao],
    type: QueryTypes.INSERT,
  })

  console.log(host, port, secure, user, pass)
  console.log(emailConfig)
  const configEmail = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass
    }
  });

  try {
    await configEmail.sendMail({
      from: 'Voyager <voyageredutec@gmail.com>',
      to: email,
      subject: 'Código de confirmação',
      html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          *{
            font-family: 'Poppins', sans-serif;
            box-sizing: border-box;
        }
    
          h2, p{
            color: #000;
          }
    
          h1{
            background: #115575;
            color: #F4F4F4;
            font-size: 1.5rem;
            padding: 1rem;
            width: 80%;
            aling-text: center;
          }
    
        </style>
      </head>
      <body>
      <header> <h1>Voyager</h1> </header>
      <main>
        <div> 
              <h2>Código de confirmação</h2> 
              <p>Esse é seu código:</p>
        </div>
        <span>${codigoVerificacao}</span>
        </main>
      <body>
      </html>
      `,
      text: `Código de confirmação: ${codigoVerificacao}`,
    });

    res.json({ message: 'Email enviado com sucesso' });
  } catch (err) {
    console.log('Erro ao enviar o e-mail:', err);
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }

});


// Rota - novo usuário

// VERIFIQUEDE

router.post('/register', async (req, res) => {
  const { name, email, senha, cod } = req.body;
  // Vai pegar o codigo de verificação
  // const verification = await Verifications.findOne({
  //   where: { email, codigo: cod }
  // });
  const [verification] = await sequelize.query("SELECT * FROM Verifications WHERE email = ? and codigo = ?", {
    replacements: [email, cod],
    type: QueryTypes.SELECT,
  })

  console.log(cod, verification)
  console.log('Sessão no momento do registro:', req.session);

  if (!verification.codigo) {
    return res.status(400).json({ error: 'Nenhum código de verificação encontrado' });
  }
  // Verificar se o código fornecido corresponde ao código armazenado na sessão
  if (cod != verification.codigo) {
    return res.status(400).json({ error: 'Código de confirmação inválido', err: console.log(cod, verification) });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    // Cria um novo usuario
    // const newUser = await User.create({
    //   name,
    //   email,
    //   senha: hashedPassword
    // });
    const [newUser] = await sequelize.query("INSERT INTO Users (id ,name, email, senha, createdAt, updatedAt) values(null, ?, ?, ?, now(), now())", {
      replacements: [name, email, hashedPassword],
      type: QueryTypes.INSERT,
    })

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




// Rota - Login

// VERIFIQUEDE

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Busca o usuario no banco de patos
    // const user = await User.findOne({ where: { 
    //   email
    // } });
    const [user] = await sequelize.query("SELECT * FROM Users WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    })

    if (!user) {
       return res.status(401).json({ error: 'Usuário não encontrado' });
     }
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  res.status(200).json({ success: true, userId: user.id, name: user.name });
  

} catch (error) {
  console.error('Erro ao fazer login:', error);
  res.status(500).json({ error: error.original.code });
}

});

router.get('/scores', async (req, res) => {
  try {
    // A query está na pagina "code"
    const scores = await getUsersWithScores();
    res.json(scores);
  } catch (error) {
    console.error('Erro ao buscar pontuações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota - Tabela

router.get('/api/getUserScore', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Usuário não fornecido' });
  }

  try {
    // Vai fazer algo muito legal(q eu n sei)
    // const userWithScores = await User.findOne({
    //   attributes: [
    //     'id',
    //     'name',
    //     [sequelize.fn('MAX', sequelize.col('runs.pontuacao')), 'totalScore'],
    //   ],
    //   include: [
    //     {
    //       model: Run,
    //       attributes: [],
    //     },
    //   ],
    //   where: { id: userId },
    //   group: ['User.id'],
    // });

    const [userWithScores] = await sequelize.query(`SELECT 
          MAX(Runs.createdAt),
          COUNT(Runs.id) AS entryCount, 
          Users.name AS userName, 
          MAX(Runs.pontuacao) AS totalScore
        FROM Runs
        JOIN Users ON Runs.iduser = Users.id
        WHERE Users.id = ?
        GROUP BY Users.id
        ORDER BY totalScore DESC`, {
      replacements: [userId],
      type: QueryTypes.SELECT,
    })
    console.log(userWithScores);
    if (userWithScores) {
      res.json(userWithScores);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Adicionando a run

router.post('/save-score', async (req, res) => {
    const { userId, score } = req.body; // Receba o userId e a pontuação do front-end
    try {
        if (!userId || !score) {
            return res.status(400).json({ error: 'User ID e score são obrigatórios.' });
        }

        // Vai criar uma nova pontuação na tabela "Runs"
        // const newScore = await Runs.create({
        //     iduser: userId,
        //     pontuacao: score
        // });

        const newScore = await sequelize.query("INSERT INTO Runs (iduser, pontuacao, createdAt, updatedAt) VALUES (?, ?, now(), now())", {
          replacements: [userId, score],
          type: QueryTypes.INSERT,
        })

        res.status(201).json({ message: 'Pontuação salva com sucesso!', score: newScore });
    } catch (error) {
        console.error('Erro ao salvar a pontuação:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

module.exports = router;

module.exports = router;
