const db = require('../../db');

class Empresa {
  static async create(id_usuario, cnpj, nome_empresa, setor) {
    const [result] = await db.execute(
      'INSERT INTO empresas (id_usuario, cnpj, nome_empresa, setor) VALUES (?, ?, ?, ?)',
      [id_usuario, cnpj, nome_empresa, setor]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM empresas WHERE id_empresa = ?', [id]);
    return rows[0];
  }

  static async update(id, cnpj, nome_empresa, setor) {
    const [result] = await db.execute(
      'UPDATE empresas SET cnpj = ?, nome_empresa = ?, setor = ? WHERE id_empresa = ?',
      [cnpj, nome_empresa, setor, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM empresas WHERE id_empresa = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Empresa;
