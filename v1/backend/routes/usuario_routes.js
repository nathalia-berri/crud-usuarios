const express = require('express');
const router = express.Router();
const db = require("../db")

// CREATE - vulnerável (exemplo só para mostrar, normalmente insert é menos usado para injeção, mas pode ser)
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Campos obrigatórios' });

  const sql = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, nome, email });
  });
});

// READ - vulnerável a SQL Injection
router.get('/', (req, res) => {
  const nome = req.query.nome || '';
  const sql = `SELECT * FROM usuarios WHERE nome = '${nome}'`;  // concatenação direta, vulnerável

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// UPDATE - vulnerável
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const sql = `UPDATE usuarios SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.status(200).json({ id, nome, email });
  });
});

// DELETE - vulnerável
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM usuarios WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
  });
});

