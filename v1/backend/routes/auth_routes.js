const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas' });

    res.json({ mensagem: 'Login bem-sucedido' }); // sem token, por simplicidade
  });
});

module.exports = router;
