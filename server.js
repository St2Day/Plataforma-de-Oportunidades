require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
const jovemRoutes = require('./src/routes/jovemRoutes');
const empresaRoutes = require('./src/routes/empresaRoutes');
const oportunidadeRoutes = require('./src/routes/oportunidadeRoutes');
const candidaturaRoutes = require('./src/routes/candidaturaRoutes');

app.use('/api/users', userRoutes);
app.use('/api/jovens', jovemRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/oportunidades', oportunidadeRoutes);
app.use('/api/candidaturas', candidaturaRoutes);


app.get('/', (req, res) => {
  res.send('Bem-vindo à Plataforma de Oportunidades!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
