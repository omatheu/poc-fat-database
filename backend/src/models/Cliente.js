const { createPool } = require('../config/database');

class Cliente {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.tipoCliente = data.tipo_cliente;
        this.descontoMaximo = data.desconto_maximo;
    }

    static async findById(id) {
        const pool = createPool();
        try {
            const [rows] = await pool.query(
                'SELECT * FROM clientes WHERE id = ?',
                [id]
            );
            
            if (rows.length === 0) return null;
            
            return new Cliente(rows[0]);
        } finally {
            pool.end();
        }
    }

    static async findByTipo(tipo) {
        const pool = createPool();
        try {
            const [rows] = await pool.query(
                'SELECT * FROM clientes WHERE tipo_cliente = ?',
                [tipo]
            );
            
            return rows.map(row => new Cliente(row));
        } finally {
            pool.end();
        }
    }
}

module.exports = Cliente; 