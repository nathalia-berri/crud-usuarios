const express = require('express');
const cors = require('cors');
const app = express();

const usuariosRoutes = require('./routes/usuario_routes');
const authRoutes = require('./routes/auth_routes');

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});