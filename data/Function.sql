USE dating;

-- Tính tuổi
DELIMITER //

CREATE FUNCTION calculate_age(birth_date DATE) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE age INT;
    
    SET age = TIMESTAMPDIFF(YEAR, birth_date, CURDATE());
    
    IF DATE_FORMAT(CURDATE(), '%m-%d') < DATE_FORMAT(birth_date, '%m-%d') THEN
        SET age = age - 1;
    END IF;
    
    RETURN age;
END //

DELIMITER ;

-- SELECT name, dateOfBirth, calculate_age(dateOfBirth) AS age FROM users;

-- Kiểm tra tính hợp lệ email
DELIMITER //

CREATE FUNCTION is_valid_email(email VARCHAR(255))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    RETURN email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
//
DELIMITER ;

-- Lấy danh sách các bản ghi pick theo status 
DELIMITER //

CREATE FUNCTION get_picks_by_status(pick_status ENUM('active', 'inactive'))
RETURNS TEXT
DETERMINISTIC
BEGIN
    DECLARE picks_list TEXT;
    SELECT GROUP_CONCAT(fullName SEPARATOR ', ') INTO picks_list
    FROM pick
    WHERE status = pick_status AND deleted = 0;
    RETURN picks_list;
END;
//
DELIMITER ;
