const User = require('../models/User');

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
