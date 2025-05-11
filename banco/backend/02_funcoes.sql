USE poc_regras_negocio_backend;

DELIMITER //

CREATE FUNCTION get_example_count()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM examples;
    RETURN total;
END //

-- Função para verificar se há estoque suficiente
CREATE FUNCTION verificar_estoque(produto_id INT, quantidade INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE estoque_atual INT;
    SELECT estoque INTO estoque_atual FROM produtos WHERE id = produto_id;
    RETURN estoque_atual >= quantidade;
END //

-- Função para obter desconto máximo do cliente
CREATE FUNCTION obter_desconto_maximo(cliente_id INT)
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
    DECLARE desconto DECIMAL(5,2);
    SELECT desconto_maximo INTO desconto FROM clientes WHERE id = cliente_id;
    RETURN desconto;
END //

-- Função para calcular valor total da venda
CREATE FUNCTION calcular_valor_total(venda_id INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);
    SELECT SUM(quantidade * preco_unitario) INTO total
    FROM itens_venda
    WHERE venda_id = venda_id;
    RETURN total;
END //

DELIMITER ; 