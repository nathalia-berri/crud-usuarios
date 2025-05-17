# CRUD Usuários 2.0 com JWT e Segurança

## Requisitos

- Node.js
- MySQL

## Instalação

```bash
npm install
```

## Configurar banco

```sql
CREATE DATABASE crud;
USE crud;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);
```

## Rodar o projeto

```bash
node server.js
```

## Rotas

- POST `/auth/register`
- POST `/auth/login`
- GET `/usuarios` (com token)
- PUT `/usuarios/:id` (com token)
- DELETE `/usuarios/:id` (com token)

## Enviar token JWT

Enviar no cabeçalho:
```
Authorization: Bearer SEU_TOKEN
```