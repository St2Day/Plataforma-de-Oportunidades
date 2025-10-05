const db = require('../../db');
const bcrypt = require('bcryptjs');

class User {
  static async create(name, email, password, type) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, type]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows[0];
  }

  static async update(id, name, email, type) {
    const [result] = await db.execute(
      'UPDATE usuarios SET nome = ?, email = ?, tipo = ? WHERE id_usuario = ?',
      [name, email, type, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = User;
