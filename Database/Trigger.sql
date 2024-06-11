USE DatingApp;

-- Trigger tự động cập nhật bảng Matches khi người dùng "like" lẫn nhau
DELIMITER //
CREATE TRIGGER after_swipe_insert
AFTER INSERT ON Swipe
FOR EACH ROW
BEGIN
    -- Kiểm tra xem người dùng được "like" có "like" người dùng hiện tại hay không
    IF NEW.Action = 'like' THEN
        IF EXISTS (
            SELECT 1 
            FROM Swipe 
            WHERE SwiperUserID = NEW.SwipedUserID 
              AND SwipedUserID = NEW.SwiperUserID 
              AND Action = 'like'
        ) THEN
            -- Nếu cả hai đều "like" nhau, thêm vào bảng Matches
            INSERT INTO Matches (UserID1, UserID2) 
            VALUES (LEAST(NEW.SwiperUserID, NEW.SwipedUserID), GREATEST(NEW.SwiperUserID, NEW.SwipedUserID));
        END IF;
    END IF;
END //
DELIMITER ;
