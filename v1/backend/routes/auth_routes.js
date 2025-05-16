const express = require('express');
const router = express.Router();
const db = require('../db');

// LOGIN vulnerável a SQL Injection
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Concatenação direta - vulnerável
const sql = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas' });

    res.json({ mensagem: 'Login bem-sucedido' });
  });
});

module.exports = router;
