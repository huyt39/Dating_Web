USE dating;

-- Trigger for categories: Update updatedAt before update
DELIMITER //
CREATE TRIGGER trg_categories_before_update
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    SET NEW.updatedAt = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for categories: Set deletedAt before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_categories_before_update_deleted
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deletedAt = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for partners: Update updatedAt before update
DELIMITER //
CREATE TRIGGER trg_partners_before_update
BEFORE UPDATE ON partners
FOR EACH ROW
BEGIN
    SET NEW.updatedAt = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for partners: Set deletedAt before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_partners_before_update_deleted
BEFORE UPDATE ON partners
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deletedAt = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for pick: Update updatedAt before update
DELIMITER //
CREATE TRIGGER trg_pick_before_update
BEFORE UPDATE ON pick
FOR EACH ROW
BEGIN
    SET NEW.updatedAt = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for pick: Set deletedAt before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_pick_before_update_deleted
BEFORE UPDATE ON pick
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deletedAt = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for users: Update updatedAt before update
DELIMITER //
CREATE TRIGGER trg_users_before_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updatedAt = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger to check password complexity on insert
DELIMITER //
CREATE TRIGGER trg_check_password
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NOT (NEW.Password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password must be at least 8 characters long and include both uppercase and lowercase letters, and numbers';
    END IF;
END;
//
DELIMITER ;

-- Trigger to check password complexity on update
DELIMITER //
CREATE TRIGGER trg_check_password_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.Password != OLD.Password THEN
        IF NOT (NEW.Password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$') THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Password must be at least 8 characters long and include both uppercase and lowercase letters, and numbers';
        END IF;
    END IF;
END;
//
DELIMITER ;
