const jwt = require('jsonwebtoken');
const SECRET = 'sua_chave_secreta_aqui';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

module.exports = autenticarToken;