const User = require('../models/user');

// Registrar usuário
exports.registerUser = async (req, res) => {
  const { name, email, password, type } = req.body;
  try {
    const userId = await User.create(name, email, password, type);
    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};
// Login de usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const bcrypt = require('bcryptjs');
    const passwordMatch = await bcrypt.compare(password, user.senha_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    res.json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};

// Listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await User.findAll(); // você pode criar método findAll() no model
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// Buscar usuário por id
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, type } = req.body;
  try {
    const affectedRows = await User.update(id, name, email, type);
    if (affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await User.delete(id);
    if (affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};
