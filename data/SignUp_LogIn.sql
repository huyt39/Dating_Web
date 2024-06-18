USE dating;

-- Stored procedures có thể giúp tránh SQL injection vì chúng phân tách mã SQL và dữ liệu.

-- Đăng ký người dùng
DELIMITER //
CREATE PROCEDURE register_user(
    IN user_name VARCHAR(255),
    IN user_major VARCHAR(255),
    IN user_date_of_birth DATE,
    IN user_gender ENUM('man', 'woman'),
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255)
)
BEGIN
    DECLARE user_age INT;
    DECLARE email_exists INT;
    
    -- Tính tuổi người dùng
    SET user_age = calculate_age(user_date_of_birth);
    
    -- Kiểm tra tuổi người dùng
    IF user_age < 18 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User must be 18 years or older to register';
    END IF;
    
    -- Kiểm tra email đã tồn tại
    SELECT COUNT(*) INTO email_exists FROM users WHERE Email = user_email;
    IF email_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already exists';
    END IF;
    
    -- Đăng ký người dùng
    INSERT INTO users (Name, Major, DateOfBirth, Gender, Email, Password)
    VALUES (user_name, user_major, user_date_of_birth, user_gender, user_email, hash_password(user_password));
END //
DELIMITER ;

-- CALL register_user('John Doe', 'Computer Science', '2000-01-01', 'man', 'john.doe@example.com', 'securepassword');

-- Đăng nhập
DELIMITER //
CREATE PROCEDURE login_user(
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255),
    OUT login_successful BOOLEAN
)
BEGIN
    DECLARE stored_password VARCHAR(255);
    
    -- Lấy mật khẩu đã lưu trong cơ sở dữ liệu
    SELECT Password INTO stored_password
    FROM users
    WHERE Email = user_email;
    
    -- Kiểm tra nếu email không tồn tại
    IF stored_password IS NULL THEN
        SET login_successful = FALSE;
        LEAVE;
    END IF;
    
    -- So sánh mật khẩu băm
    IF stored_password = hash_password(user_password) THEN
        SET login_successful = TRUE;
    ELSE
        SET login_successful = FALSE;
    END IF;
END //
DELIMITER ;

/*
SET @login_success = FALSE;
CALL login_user('john.doe@example.com', 'securepassword', @login_success);
SELECT @login_success;  -- Kiểm tra kết quả đăng nhập
*/
