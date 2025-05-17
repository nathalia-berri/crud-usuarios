const express = require('express');
const router = express.Router();
const db = require('../db');
const autenticarToken = require('../middleware/auth');

router.get('/', autenticarToken, (req, res) => {
  db.query('SELECT id, nome, email FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.put('/:id', autenticarToken, (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
  db.query(sql, [nome, email, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário atualizado com sucesso' });
  });
});

router.delete('/:id', autenticarToken, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário excluído com sucesso' });
  });
});

module.exports = router;