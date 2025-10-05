const express = require('express');
const router = express.Router();
const candidaturaController = require('../controllers/candidaturaController');

// Criar candidatura
router.post('/', candidaturaController.createCandidatura);

// Buscar candidatura por ID
router.get('/:id', candidaturaController.getCandidaturaById);

// Atualizar status da candidatura
router.put('/:id', candidaturaController.updateCandidaturaStatus);

// Deletar candidatura
router.delete('/:id', candidaturaController.deleteCandidatura);

module.exports = router;
