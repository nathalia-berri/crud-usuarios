const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'sua_chave_secreta_aqui';

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ erro: 'Campos obrigatórios' });

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ erro: err });
      res.status(201).json({ mensagem: 'Usuário registrado com sucesso', id: result.insertId });
    });
  } catch {
    res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const usuario = results[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;