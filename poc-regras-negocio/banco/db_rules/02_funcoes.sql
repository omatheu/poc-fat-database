USE poc_regras_negocio_db_rules;

DELIMITER //

-- Função para obter desconto máximo baseado no tipo de cliente
CREATE FUNCTION obter_desconto_maximo_por_tipo(tipo_cliente_param ENUM('NORMAL', 'VIP', 'PREMIUM'))
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
    DECLARE desconto DECIMAL(5,2);
    SELECT desconto_maximo INTO desconto 
    FROM regras_desconto 
    WHERE tipo_cliente = tipo_cliente_param;
    RETURN desconto;
END //

-- Função para verificar se estoque está abaixo do mínimo
CREATE FUNCTION verificar_estoque_minimo(produto_id_param INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE estoque_min INT;
    SELECT estoque_minimo INTO estoque_min 
    FROM regras_estoque 
    WHERE produto_id = produto_id_param;
    RETURN estoque_min;
END //

-- Função para obter desconto padrão baseado no valor da venda
CREATE FUNCTION obter_desconto_padrao(valor_venda DECIMAL(10,2))
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
    DECLARE desconto DECIMAL(5,2);
    SELECT desconto_padrao INTO desconto 
    FROM regras_venda 
    WHERE valor_minimo <= valor_venda 
    ORDER BY valor_minimo DESC 
    LIMIT 1;
    RETURN desconto;
END //

DELIMITER ; 