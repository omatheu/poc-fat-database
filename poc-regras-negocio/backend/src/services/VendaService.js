const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');

class VendaService {
    async criarVenda(dadosVenda) {
        try {
            // 1. Validar cliente
            const cliente = await Cliente.findById(dadosVenda.cliente_id);
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }

            // 2. Validar desconto
            if (dadosVenda.desconto_aplicado > cliente.descontoMaximo) {
                throw new Error('Desconto excede o máximo permitido para este cliente');
            }

            // 3. Validar estoque para cada item
            for (const item of dadosVenda.itens) {
                const produto = await Produto.findById(item.produto_id);
                if (!produto) {
                    throw new Error(`Produto ${item.produto_id} não encontrado`);
                }

                if (!await Produto.verificarEstoque(item.produto_id, item.quantidade)) {
                    throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
                }
            }

            // 4. Calcular valor total
            const valorTotal = await Venda.calcularValorTotal(dadosVenda.itens);

            // 5. Aplicar desconto
            const valorComDesconto = valorTotal * (1 - dadosVenda.desconto_aplicado / 100);

            // 6. Criar venda
            const venda = await Venda.create({
                ...dadosVenda,
                valor_total: valorComDesconto
            });

            // 7. Atualizar estoque
            for (const item of dadosVenda.itens) {
                await Produto.atualizarEstoque(item.produto_id, item.quantidade);
            }

            return venda;
        } catch (error) {
            throw new Error(`Erro ao criar venda: ${error.message}`);
        }
    }

    async listarVendas() {
        try {
            const vendas = await Venda.findAll();
            return vendas;
        } catch (error) {
            throw new Error(`Erro ao listar vendas: ${error.message}`);
        }
    }
}

module.exports = new VendaService(); 