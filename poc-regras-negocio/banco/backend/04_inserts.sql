USE poc_regras_negocio_backend;

-- Inserir clientes
INSERT INTO clientes (nome, tipo_cliente, desconto_maximo) VALUES
('João Silva', 'NORMAL', 5.00),
('Maria Santos', 'VIP', 10.00),
('Pedro Oliveira', 'PREMIUM', 15.00);

-- Inserir produtos
INSERT INTO produtos (nome, preco, estoque) VALUES
('Notebook', 3500.00, 10),
('Smartphone', 2000.00, 15),
('Tablet', 1500.00, 20); 