const express = require('express');
const router = express.Router();
const db = require("../db")

// CREATE - POST
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Campos obrigatórios' });

  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, nome, email });
  });
});

// READ - GET
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// UPDATE - PUT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

  db.query(sql, [nome, email, senha, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.status(200).json({ id, nome, email });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
  });
});

module.exports = router;
