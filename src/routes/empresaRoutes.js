const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Criar empresa
router.post('/', empresaController.createEmpresa);

// Buscar empresa por ID
router.get('/:id', empresaController.getEmpresaById);

// Atualizar empresa
router.put('/:id', empresaController.updateEmpresa);

// Deletar empresa
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;
