require('dotenv').config();
const mysql = require('mysql2/promise');

// Cria um pool de conexões com o banco de dados
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Função para testar a conexão
async function testConnection() {
  try {
    await connection.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Testa a conexão ao iniciar o arquivo
testConnection();

module.exports = connection;
