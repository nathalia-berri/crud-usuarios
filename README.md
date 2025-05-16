# crud-usuarios-v1
Projeto API RESTful com Node.js e MySQL

1. Objetivo

Desenvolver uma aplicação web (API RESTful) em duas versões:

Versão 1.0: Sem segurança, para simular e testar vulnerabilidades. Esta versão não possui validações de entrada, geração de token ou criptografia de senhas.

Versão 2.0: Com proteções e boas práticas implementadas, incluindo validações, criptografia de senhas e autenticação com JWT, conforme os testes de segurança executados.

2. Tecnologias Utilizadas

  Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- Node.js: Ambiente de execução JavaScript no servidor.

- Express: Framework para criação da API RESTful.

- MySQL: Banco de dados relacional para armazenamento dos usuários.

- bcrypt: Criptografia de senhas para segurança dos dados dos usuários.

- jsonwebtoken (JWT): Autenticação e autorização baseada em tokens.

2. Instalação das Dependências

2.1 - Certifique-se de ter o Node.js instalado.

2.2 - Abra o terminal do VS Code (Terminal > New Terminal).

2.3 - Execute os seguintes comandos para instalar as dependências:

  npm install express
  npm install mysql2
  npm install jsonwebtoken
  npm install bcryptjs
  npm install express-validator


4 - Como Rodar a Aplicação Localmente

4.1 - Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=meu_banco
DB_PORT=3306
PORT=3000
JWT_SECRET=chave_secreta_super_segura
JWT_EXPIRATION=1h

4.2 - No terminal do VS Code, rode o comando: node ./v1/backend/server.js

4.3 - O servidor irá iniciar com a mensagem "Servidor rodando na porta 3000. Conectado ao banco MySQL".

4.4 - A API estará disponível no endereço http://localhost:3000.


5 - Funcionalidades

5.1 - CRUD Básico de Usuários:

- GET /usuarios: Lista todos os usuários.
- POST /usuarios: Cria novo usuário.
- PUT /usuarios/:id: Atualiza um usuário.
- DELETE /usuarios/:id: Deleta um usuário.

5.2 - Autenticação JWT:

- POST /auth/register: Registro de novos usuários.
- POST /auth/login: Login com geração de token.

6 - Requisições via Postman

6.1 - Exemplo 1 - Login com sucesso

Request:  

{  
  "username": "william.caixa",  
  "password": "senha123"  
}  

Response:

{  
  "message": "Login bem-sucedido!",  
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  
}  

------------------------------------------------
6.2 - Exemplo 2 - Usuário não cadastrado  

Request:  

{  
  "username": "nathalia.adm",  
  "password": "senha13"  
}  

Response:  
{  
  "message": "Usuário ou senha incorretos"  
}  

------------------------------------------------
6.3 - Exemplo 3 - Campo ausente  

Request:  

{  
  "username": "william"  
}  

Response:  
{  
  "message": "O campo 'password' é obrigatório."  
}  

------------------------------------------------

Documentação: https://docs.google.com/document/d/1BnJ_oNk-gndAYurG56RxWAtoZrx1hjOVTpGsLRtBzic/edit?usp=sharing


