USE DatingApp;

-- Đăng ký người dùng
DELIMITER //
CREATE PROCEDURE RegisterUser(
    IN pEmail VARCHAR(255),
    IN pPassword VARCHAR(255),
    IN pName VARCHAR(255),
    IN pMajor VARCHAR(255),
    IN pClass VARCHAR(50),
    IN pCountry VARCHAR(100),
    IN pDateOfBirth DATE,
    IN pGenderID INT,
    IN pInterest TEXT,
    IN pMoreAboutYou TEXT
)
BEGIN
    DECLARE userID INT;
    DECLARE userAge INT;
    DECLARE hashedPassword VARCHAR(255);

    -- Kiểm tra xem email đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM Users WHERE Email = pEmail) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email already exists';
    END IF;
    -- Kiểm tra tuổi người dùng
    SET userAge = CalculateAge(pDateOfBirth); -- Tạo CalculateAge trong Function rồi
    IF userAge < 16 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User must be at least 16 years old to register';
    END IF;

    -- Băm mật khẩu
    SET hashedPassword = SHA2(pPassword, 256);

    -- Thêm người dùng mới vào bảng Users
    INSERT INTO Users (Email, PasswordHash) VALUES (pEmail, hashedPassword);
    SET userID = LAST_INSERT_ID();

    -- Thêm hồ sơ người dùng mới vào bảng Profiles
    INSERT INTO Profiles (UserID, Name, Major, Class, Country, DateOfBirth, GenderID, Interest, Moreaboutyou)
    VALUES (userID, pName, pMajor, pClass, pCountry, pDateOfBirth, pGenderID, pInterest, pMoreAboutYou);
END //
DELIMITER ;

-- CALL RegisterUser('example@example.com', 'plaintext_password', 'John Doe', 'Computer Science', 'CS101', 'USA', '2000-01-01', 1, 'Coding', 'More about John');



-- Đăng nhập người dùng 
DELIMITER //
CREATE PROCEDURE LoginUser(
    IN pEmail VARCHAR(255),
    IN pPassword VARCHAR(255),
    OUT pUserID INT
)
BEGIN
    DECLARE tempUserID INT;
    DECLARE tempPasswordHash VARCHAR(255);
    -- Kiểm tra xem email có tồn tại không
    SELECT UserID, PasswordHash INTO tempUserID, tempPasswordHash
    FROM Users
    WHERE Email = pEmail;
    -- Nếu không tìm thấy người dùng, phát ra lỗi
    IF tempUserID IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email or password';
    END IF;
    -- Kiểm tra mật khẩu đã băm
    IF tempPasswordHash != SHA2(pPassword, 256) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email or password';
    END IF;

    -- Nếu email và mật khẩu hợp lệ, trả về UserID
    SET pUserID = tempUserID;
END //
DELIMITER ;
/* 
SET @UserID = 0;
CALL LoginUser('example@example.com', 'plaintext_password', @UserID);
SELECT @UserID;
*/





