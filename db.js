const mysql = require("mysql2/promise");
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Configurações do Pool de Conexões
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(poolConfig);


async function initializeDatabase() {
  if (process.env.RUN_INIT_SCRIPT === 'true') {
    console.log('Iniciando script de inicialização do banco de dados...');
    try {
      const tempConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });

      // Lê o script SQL
      const sqlPath = path.join(__dirname, 'init_db.sql');
      const sqlScript = await fs.readFile(sqlPath, 'utf8');

      const statements = sqlScript.split(';').filter(s => s.trim().length > 0);
      for (const statement of statements) {
        await tempConnection.query(statement);
      }

      await tempConnection.end();
      console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados:', error.message);
    }
  } else {
    console.log('Inicialização do banco de dados ignorada (RUN_INIT_SCRIPT é false).');
  }
}

// Executa a inicialização do banco de dados
initializeDatabase();

module.exports = pool;