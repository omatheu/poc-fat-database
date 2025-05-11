const { createPool } = require('../config/database');

class Produto {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.preco = data.preco;
        this.estoque = data.estoque;
    }

    static async findById(id) {
        const pool = createPool();
        try {
            const [rows] = await pool.query(
                'SELECT * FROM produtos WHERE id = ?',
                [id]
            );
            
            if (rows.length === 0) return null;
            
            return new Produto(rows[0]);
        } finally {
            pool.end();
        }
    }

    static async verificarEstoque(id, quantidade) {
        const pool = createPool();
        try {
            const [rows] = await pool.query(
                'SELECT estoque FROM produtos WHERE id = ?',
                [id]
            );
            
            if (rows.length === 0) return false;
            
            return rows[0].estoque >= quantidade;
        } finally {
            pool.end();
        }
    }

    static async atualizarEstoque(id, quantidade) {
        const pool = createPool();
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Verificar estoque atual
            const [rows] = await conn.query(
                'SELECT estoque FROM produtos WHERE id = ? FOR UPDATE',
                [id]
            );
            
            if (rows.length === 0) {
                throw new Error('Produto não encontrado');
            }
            
            const estoqueAtual = rows[0].estoque;
            const novoEstoque = estoqueAtual - quantidade;
            
            if (novoEstoque < 0) {
                throw new Error('Estoque insuficiente');
            }
            
            // Atualizar estoque
            await conn.query(
                'UPDATE produtos SET estoque = ? WHERE id = ?',
                [novoEstoque, id]
            );
            
            await conn.commit();
            return true;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
            pool.end();
        }
    }
}

module.exports = Produto; 