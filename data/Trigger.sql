USE dating_app;

-- Trigger for categories: Update updated_at before update
DELIMITER //
CREATE TRIGGER trg_categories_before_update
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for categories: Set deleted_at before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_categories_before_update_deleted
BEFORE UPDATE ON categories
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deleted_at = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for partners: Update updated_at before update
DELIMITER //
CREATE TRIGGER trg_partners_before_update
BEFORE UPDATE ON partners
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for partners: Set deleted_at before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_partners_before_update_deleted
BEFORE UPDATE ON partners
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deleted_at = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for picks: Update updated_at before update
DELIMITER //
CREATE TRIGGER trg_picks_before_update
BEFORE UPDATE ON picks
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

-- Trigger for picks: Set deleted_at before update when deleted is set to 1
DELIMITER //
CREATE TRIGGER trg_picks_before_update_deleted
BEFORE UPDATE ON picks
FOR EACH ROW
BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        SET NEW.deleted_at = CURRENT_TIMESTAMP;
    END IF;
END;
//
DELIMITER ;

-- Trigger for users: Update updated_at before update
DELIMITER //
CREATE TRIGGER trg_users_before_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;
//
DELIMITER ;

DELIMITER //

CREATE TRIGGER trg_check_password
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NOT (NEW.password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password must be at least 8 characters long and include both uppercase and lowercase letters, and numbers';
    END IF;
END;
//

CREATE TRIGGER trg_check_password_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.password != OLD.password THEN
        IF NOT (NEW.password REGEXP '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$') THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Password must be at least 8 characters long and include both uppercase and lowercase letters, and numbers';
        END IF;
    END IF;
END;
//

DELIMITER ;
