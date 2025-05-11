USE poc_regras_negocio_db_rules;

DELIMITER //

-- Trigger para atualizar timestamp de criação
CREATE TRIGGER before_regras_desconto_insert
BEFORE INSERT ON regras_desconto
FOR EACH ROW
BEGIN
    SET NEW.created_at = CURRENT_TIMESTAMP;
END //

-- Trigger para atualizar timestamp de atualização
CREATE TRIGGER before_regras_desconto_update
BEFORE UPDATE ON regras_desconto
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

-- Trigger para validar desconto máximo
CREATE TRIGGER before_regras_desconto_insert_validate
BEFORE INSERT ON regras_desconto
FOR EACH ROW
BEGIN
    IF NEW.desconto_maximo < 0 OR NEW.desconto_maximo > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Desconto máximo deve estar entre 0 e 100';
    END IF;
END //

DELIMITER ; 