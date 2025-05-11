const Venda = require('../models/Venda');
const VendaService = require('../services/VendaService');

class VendaController {
    async criarVenda(req, res) {
        try {
            const venda = await VendaService.criarVenda(req.body);
            res.status(201).json(venda);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarVendas(req, res) {
        try {
            const vendas = await VendaService.listarVendas();
            res.json(vendas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async buscarVenda(req, res) {
        try {
            const venda = await Venda.findById(req.params.id);
            if (!venda) {
                return res.status(404).json({ error: 'Venda não encontrada' });
            }
            res.json(venda);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VendaController(); 