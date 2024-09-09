const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Rota - novo usuário
router.post('/register', async (req, res) => {
  const { name, email, senha } = req.body;

  try {
    if (!name || !email || !senha) {
      return res.status(400).json({ error: 'Nome e senha são obrigatórios' });
    }

    const newUser = await User.create({
      name,
      email,
      senha
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
