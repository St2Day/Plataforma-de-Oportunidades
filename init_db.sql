USE buwgwsxvd2jc6jiocqfe;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'empresa', 'candidato') NOT NULL DEFAULT 'candidato',
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS empresas (
  id_empresa INT AUTO_INCREMENT PRIMARY KEY,
  nome_empresa VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) UNIQUE,
  email_contato VARCHAR(255),
  descricao TEXT,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vagas (
  id_vaga INT AUTO_INCREMENT PRIMARY KEY,
  id_empresa INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  localizacao VARCHAR(255),
  salario DECIMAL(10,2),
  data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

CREATE TABLE IF NOT EXISTS candidaturas (
  id_candidatura INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_vaga INT NOT NULL,
  data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_vaga) REFERENCES vagas(id_vaga)
);

CREATE TABLE IF NOT EXISTS mensagens (
  id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
  id_remetente INT NOT NULL,
  id_destinatario INT NOT NULL,
  conteudo TEXT NOT NULL,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_remetente) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (id_destinatario) REFERENCES usuarios(id_usuario)
);
