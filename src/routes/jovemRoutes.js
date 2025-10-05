const express = require('express');
const router = express.Router();
const jovemController = require('../controllers/jovemController');

// Criar jovem
router.post('/', jovemController.createJovem);

// Buscar jovem por ID
router.get('/:id', jovemController.getJovemById);

// Atualizar jovem
router.put('/:id', jovemController.updateJovem);

// Deletar jovem
router.delete('/:id', jovemController.deleteJovem);

module.exports = router;
