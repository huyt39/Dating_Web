USE DatingApp;

-- Tinh tuoi
DELIMITER //
CREATE FUNCTION CalculateAge(pDateOfBirth DATE)
RETURNS INT
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, pDateOfBirth, CURDATE());
    IF DATE_FORMAT(CURDATE(), '%m-%d') < DATE_FORMAT(pDateOfBirth, '%m-%d') THEN
        SET age = age - 1;
    END IF;
    RETURN age;
END //
DELIMITER ;
