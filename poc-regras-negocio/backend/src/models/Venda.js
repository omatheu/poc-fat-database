const { createPool } = require('../config/database');

class Venda {
    constructor(data) {
        this.id = data.id;
        this.cliente_id = data.cliente_id;
        this.valor_total = data.valor_total;
        this.desconto_aplicado = data.desconto_aplicado;
        this.itens = data.itens || [];
    }

    static async findById(id) {
        const pool = createPool();
        try {
            const [rows] = await pool.query(
                'SELECT * FROM vendas WHERE id = ?',
                [id]
            );
            
            if (rows.length === 0) return null;
            
            // Buscar itens da venda
            const [itens] = await pool.query(
                'SELECT * FROM itens_venda WHERE venda_id = ?',
                [id]
            );
            
            return new Venda({
                ...rows[0],
                itens
            });
        } finally {
            pool.end();
        }
    }

    static async listarVendas() {
        const pool = createPool();
        try {
            const [rows] = await pool.query('SELECT * FROM vendas');
            
            // Para cada venda, buscar seus itens
            const vendasComItens = await Promise.all(
                rows.map(async (venda) => {
                    const [itens] = await pool.query(
                        'SELECT * FROM itens_venda WHERE venda_id = ?',
                        [venda.id]
                    );
                    return new Venda({
                        ...venda,
                        itens
                    });
                })
            );
            
            return vendasComItens;
        } finally {
            pool.end();
        }
    }

    static async create(data) {
        const pool = createPool();
        const conn = await pool.getConnection();
        try {
            // Validar dados obrigatórios
            if (!data.cliente_id) {
                throw new Error('cliente_id é obrigatório');
            }

            // Iniciar transação
            await conn.beginTransaction();

            // Inserir venda
            const [result] = await conn.query(
                'INSERT INTO vendas (cliente_id, valor_total, desconto_aplicado) VALUES (?, ?, ?)',
                [data.cliente_id, data.valor_total, data.desconto_aplicado]
            );

            const vendaId = result.insertId;

            // Inserir itens da venda
            for (const item of data.itens) {
                await conn.query(
                    'INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
                    [vendaId, item.produto_id, item.quantidade, item.preco_unitario]
                );
            }

            // Commit da transação
            await conn.commit();

            // Retornar venda criada
            return await this.findById(vendaId);
        } catch (error) {
            // Rollback em caso de erro
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
            pool.end();
        }
    }

    static async calcularValorTotal(itens) {
        const pool = createPool();
        try {
            let valorTotal = 0;
            
            for (const item of itens) {
                const [rows] = await pool.query(
                    'SELECT preco FROM produtos WHERE id = ?',
                    [item.produto_id]
                );
                
                if (rows.length === 0) {
                    throw new Error(`Produto ${item.produto_id} não encontrado`);
                }
                
                valorTotal += rows[0].preco * item.quantidade;
            }
            
            return valorTotal;
        } finally {
            pool.end();
        }
    }
}

module.exports = Venda; 