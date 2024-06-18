USE dating;

-- Stored procedures có thể giúp tránh SQL injection vì chúng phân tách mã SQL và dữ liệu.

DELIMITER //

CREATE PROCEDURE getUser(IN user_email VARCHAR(255), IN user_password VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE Email = user_email AND Password = user_password;
END //

DELIMITER ;

/* Ví dụ gọi Stored Procedure 
$stmt = $conn->prepare("CALL getUser(?, ?)");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();
*/
