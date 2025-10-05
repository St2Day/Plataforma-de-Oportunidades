const db = require('../../db');

class Jovem {
  static async create(id_usuario, idade, escolaridade, area_interesse) {
    const [result] = await db.execute(
      'INSERT INTO jovens (id_usuario, idade, escolaridade, area_interesse) VALUES (?, ?, ?, ?)',
      [id_usuario, idade, escolaridade, area_interesse]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM jovens WHERE id_jovem = ?', [id]);
    return rows[0];
  }

  static async update(id, idade, escolaridade, area_interesse) {
    const [result] = await db.execute(
      'UPDATE jovens SET idade = ?, escolaridade = ?, area_interesse = ? WHERE id_jovem = ?',
      [idade, escolaridade, area_interesse, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM jovens WHERE id_jovem = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Jovem;
