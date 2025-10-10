// server.js
const express = require('express');

const db = require("./db");
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do banco

// 🔹 Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor e banco de dados funcionando!');
});

// 🔹 Importa as rotas de usuário (depois do app e antes do listen)
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

// 🔹 Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app };
