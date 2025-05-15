const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ajuste conforme seu banco
  database: 'crud_usuarios'
});

conexao.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco MySQL!');
});

module.exports = conexao;
