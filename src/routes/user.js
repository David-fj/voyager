const express = require('express');
const router = express.Router();
const { User, Runs, Verifications } = require('../models');
const { getUsersWithScores } = require('../code/tableLogin')
const bcrypt = require('bcryptjs');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { error } = require('console');


// Rota - novo usuário
// function criaToken() {
//   return crypto.randomInt(100000, 999999).toString()
// }
// const codigo = Number(criaToken())

// router.post('/confirm', async (req, res) => {
//   const { email } = req.body

//   if (!email) {
//     return res.status(400).json({ error: 'Email não fornecido' });
//   }
  

//   const configEmail = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'voyageredutec@gmail.com',
//         pass: 'cbpooqysuzoamvnj'
//     }
// }); 
  
//   try{
//   await configEmail.sendMail({
//        from: 'Voyager <voyageredutec@gmail.com>',
//        to: email,
//        subject: 'teste de confirmação',
//        html: `<h1>codigo de confirmação</h1> <p>Esse é seu código: ${codigo}</p>`,
//        text: `Código de confirmação Codigo: ${codigo}`
//    })
//    .then(() => 
//     router.post('/register', async (req, res) => {

//       let resposta;
//       const { name, email, senha, cod } = req.body;
      
//         try {    
//           async function confirmar() {
//                 if (cod == codigo) {
//                     resposta = true
//                 } else {
//                     resposta = false
//                 }
//             }
//             confirmar()
      
//           if (!name || !email || !senha || resposta === false) {
//             return res.status(400).json({ error: 'Erro' });
//           }
//           const hashedPassword = await bcrypt.hash(senha, 10);
//           let newUser;
//           if( resposta === true ){
//             newUser = await User.create({
//             name,
//             email,
//             senha: hashedPassword
//           }) 
//           res.status(201).json(newUser);
//         } else {
//             return res.status(400).json({ error: error });
//           };
          
//         } catch (error) {
//           console.error('Erro ao criar o usuário:', error);
//           res.status(500).json({ error: 'Erro interno do servidor' });
//         }
//       })
//   )
//    .catch((err) => console.log('Erro ao enviar, tente novamente: ', err));


//   res.json({message: 'Executada'})
//   } catch (err) {
//     console.log('Erro ao enviar o e-mail:', err);
//     res.status(500).json({ error: 'Erro ao enviar o e-mail' });
//   }
// })


// function criaToken() {
//   return crypto.randomInt(100000, 999999).toString();
// }

router.post('/confirm', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email não fornecido' });
  }
  
  // Gerar e armazenar o código de verificação na sessão
  const codigoVerificacao = crypto.randomInt(100000, 999999).toString();
  await Verifications.create({
    email,
    codigo: codigoVerificacao
  });

  const configEmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'voyageredutec@gmail.com',
      pass: 'cbpooqysuzoamvnj'
    }
  });

  try {
    await configEmail.sendMail({
      from: 'Voyager <voyageredutec@gmail.com>',
      to: email,
      subject: 'Código de confirmação',
      html: `<h1>Código de confirmação</h1> <p>Esse é seu código: ${codigoVerificacao}</p>`,
      text: `Código de confirmação: ${codigoVerificacao}`
    });

    res.json({ message: 'Email enviado com sucesso' });
  } catch (err) {
    console.log('Erro ao enviar o e-mail:', err);
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }

});


router.post('/register', async (req, res) => {
  const { name, email, senha, cod } = req.body;
  const verification = await Verifications.findOne({
    where: { email, codigo: cod }
  });
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
    const newUser = await User.create({
      name,
      email,
      senha: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




/*LOGIN*/

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ where: { 
      email
    } });
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
    const scores = await getUsersWithScores();
    res.json(scores);
  } catch (error) {
    console.error('Erro ao buscar pontuações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
 // Tabela

 router.get('/api/getUserScore', async (req, res) => {
  const userId = req.query.userId; // Obtenha o userId da query string ou do token

  if (!userId) {
    return res.status(400).json({ error: 'Usuário não fornecido' });
  }

  try {
    const userWithScores = await User.findOne({
      attributes: [
        'id',
        'name',
        [sequelize.fn('MAX', sequelize.col('runs.pontuacao')), 'totalScore'],
      ],
      include: [
        {
          model: Run,
          attributes: [],
        },
      ],
      where: { id: userId },
      group: ['User.id'],
    });

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

// Add run

router.post('/save-score', async (req, res) => {
    const { userId, score } = req.body; // Receba o userId e a pontuação do front-end

    try {
        // Verifique se o usuário e a pontuação foram fornecidos
        if (!userId || !score) {
            return res.status(400).json({ error: 'User ID e score são obrigatórios.' });
        }

        // Salve a pontuação no banco de dados
        const newScore = await Runs.create({
            iduser: userId,
            pontuacao: score
        });

        res.status(201).json({ message: 'Pontuação salva com sucesso!', score: newScore });
    } catch (error) {
        console.error('Erro ao salvar a pontuação:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

module.exports = router;


module.exports = router;
