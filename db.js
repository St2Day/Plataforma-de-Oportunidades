const mysql = require("mysql2/promise");
require('dotenv').config();


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

console.log('Conexão com o banco de dados configurada. Certifique-se de que o banco de dados e as tabelas já foram criados.');

module.exports = pool;
.env Atualizado: Removi a variável RUN_INIT_SCRIPT, pois ela não é mais necessária.
Instruções de Uso:
Substitua o db.js antigo pelo novo.
Use o arquivo .env atualizado (anexado).
IMPORTANTE: Como não há mais o script de inicialização, você deve garantir que o banco de dados chamado sistema_oportunidades e todas as suas tabelas (usuários, jovens, empresas, oportunidades, candidaturas) sejam criados manualmente antes de rodar o projeto. Você pode usar o conteúdo do init_db.sql que eu havia criado para fazer essa criação manual.
Os arquivos db.js e .env atualizados estão anexados.
db.js
Código · 637 B
.env
Arquivo · 240 B

Ver todos os arquivos nesta tarefa
Tarefa concluída
Como foi este resultado?
Sugestões de acompanhamento
Enviar mensagem para Manus
db.js
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
