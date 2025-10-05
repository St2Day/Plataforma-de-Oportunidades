const db = require('../../db');

class Oportunidade {
  static async create(id_empresa, titulo, descricao, tipo, localizacao, data_publicacao, data_limite) {
    const [result] = await db.execute(
      'INSERT INTO oportunidades (id_empresa, titulo, descricao, tipo, localizacao, data_publicacao, data_limite) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_empresa, titulo, descricao, tipo, localizacao, data_publicacao, data_limite]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM oportunidades WHERE id_oportunidade = ?', [id]);
    return rows[0];
  }

  static async update(id, titulo, descricao, tipo, localizacao, data_publicacao, data_limite) {
    const [result] = await db.execute(
      'UPDATE oportunidades SET titulo = ?, descricao = ?, tipo = ?, localizacao = ?, data_publicacao = ?, data_limite = ? WHERE id_oportunidade = ?',
      [titulo, descricao, tipo, localizacao, data_publicacao, data_limite, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM oportunidades WHERE id_oportunidade = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Oportunidade;
