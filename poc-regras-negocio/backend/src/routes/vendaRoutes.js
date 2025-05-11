const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/VendaController');

// Rotas de vendas
router.get('/', vendaController.listarVendas);
router.get('/:id', vendaController.buscarVenda);
router.post('/', vendaController.criarVenda);

module.exports = router; 