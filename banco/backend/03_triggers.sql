USE poc_regras_negocio_backend;

DELIMITER //

CREATE TRIGGER before_example_insert
BEFORE INSERT ON examples
FOR EACH ROW
BEGIN
    SET NEW.created_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER before_example_update
BEFORE UPDATE ON examples
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

-- Trigger para verificar estoque antes de inserir item na venda
CREATE TRIGGER before_item_venda_insert
BEFORE INSERT ON itens_venda
FOR EACH ROW
BEGIN
    IF NOT verificar_estoque(NEW.produto_id, NEW.quantidade) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente para realizar a venda';
    END IF;
END //

-- Trigger para atualizar estoque após inserir item na venda
CREATE TRIGGER after_item_venda_insert
AFTER INSERT ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE produtos 
    SET estoque = estoque - NEW.quantidade
    WHERE id = NEW.produto_id;
END //

-- Trigger para verificar desconto máximo antes de inserir venda
CREATE TRIGGER before_venda_insert
BEFORE INSERT ON vendas
FOR EACH ROW
BEGIN
    DECLARE desconto_max DECIMAL(5,2);
    SET desconto_max = obter_desconto_maximo(NEW.cliente_id);
    
    IF NEW.desconto_aplicado > desconto_max THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Desconto excede o máximo permitido para este cliente';
    END IF;
END //

-- Trigger para atualizar valor total da venda após inserir item
CREATE TRIGGER after_item_venda_insert_update_total
AFTER INSERT ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE vendas 
    SET valor_total = calcular_valor_total(NEW.venda_id)
    WHERE id = NEW.venda_id;
END //

DELIMITER ; 