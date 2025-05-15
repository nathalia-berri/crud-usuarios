CREATE DATABASE IF NOT EXISTS crud_usuarios;
USE crud_usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  senha VARCHAR(100) -- senha sem hash (inseguro)
);
