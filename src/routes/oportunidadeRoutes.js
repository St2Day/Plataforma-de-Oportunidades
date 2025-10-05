const express = require('express');
const router = express.Router();
const oportunidadeController = require('../controllers/oportunidadeController');

// Criar oportunidade
router.post('/', oportunidadeController.createOportunidade);

// Buscar oportunidade por ID
router.get('/:id', oportunidadeController.getOportunidadeById);

// Atualizar oportunidade
router.put('/:id', oportunidadeController.updateOportunidade);

// Deletar oportunidade
router.delete('/:id', oportunidadeController.deleteOportunidade);

module.exports = router;
