USE poc_regras_negocio_db_rules;

-- Inserir regras de desconto por tipo de cliente
INSERT INTO regras_desconto (tipo_cliente, desconto_maximo) VALUES
('NORMAL', 5.00),
('VIP', 10.00),
('PREMIUM', 15.00);

-- Inserir regras de estoque mínimo
INSERT INTO regras_estoque (produto_id, estoque_minimo) VALUES
(1, 5),  -- Notebook
(2, 3),  -- Smartphone
(3, 4);  -- Tablet

-- Inserir regras de venda
INSERT INTO regras_venda (valor_minimo, desconto_padrao) VALUES
(1000.00, 2.00),
(2000.00, 3.00),
(3000.00, 5.00); 