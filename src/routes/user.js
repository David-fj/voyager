const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { getUsersWithScores } = require('../code/tableLogin')
const bcrypt = require('bcryptjs');

// Rota - novo usuário
router.post('/register', async (req, res) => {
  const { name, email, senha } = req.body;

  try {
    if (!name || !email || !senha) {
      return res.status(400).json({ error: 'Nome e senha são obrigatórios' });
    }
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
  res.status(200).json({ success: true, name: user.name });
  

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

module.exports = router;
