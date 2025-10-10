const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Criar usuário
router.post('/register', userController.registerUser);

// Login do usuário
router.post('/login', userController.loginUser);

// Buscar usuário por ID
router.get('/:id', userController.getUserById);

// Atualizar usuário
router.put('/:id', userController.updateUser);

// Deletar usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
