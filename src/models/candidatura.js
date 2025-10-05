const db = require('../../db');

class Candidatura {
  static async create(id_jovem, id_oportunidade, status = 'Pendente') {
    const [result] = await db.execute(
      'INSERT INTO candidaturas (id_jovem, id_oportunidade, status) VALUES (?, ?, ?)',
      [id_jovem, id_oportunidade, status]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM candidaturas WHERE id_candidatura = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE candidaturas SET status = ? WHERE id_candidatura = ?',
      [status, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM candidaturas WHERE id_candidatura = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Candidatura;
