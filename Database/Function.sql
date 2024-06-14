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

-- Tìm người phù hợp về giới tính quan tâm và kiểu mối quan hệ quan tâm 
DELIMITER //
CREATE FUNCTION GetMatchingProfiles(userID INT) RETURNS TEXT
BEGIN
    DECLARE genderList TEXT;
    DECLARE relationList TEXT;
    DECLARE matchingProfiles TEXT;
    
    -- Lấy danh sách các giới tính mà người dùng quan tâm
    SELECT GROUP_CONCAT(GenderID)
    INTO genderList
    FROM InterestedInGender
    WHERE ProfileID = (SELECT ProfileID FROM Profiles WHERE UserID = userID);

    -- Lấy danh sách các loại mối quan hệ mà người dùng quan tâm
    SELECT GROUP_CONCAT(RelationshipTypeID)
    INTO relationList
    FROM InterestedInRelation
    WHERE ProfileID = (SELECT ProfileID FROM Profiles WHERE UserID = userID);

    -- Tìm các hồ sơ người dùng phù hợp với các tiêu chí này
    SELECT GROUP_CONCAT(ProfileID)
    INTO matchingProfiles
    FROM Profiles
    WHERE GenderID IN (genderList) 
    AND ProfileID IN (
        SELECT ProfileID 
        FROM InterestedInRelation 
        WHERE RelationshipTypeID IN (relationList)
    )
    AND UserID <> userID; -- Không bao gồm người dùng hiện tại

    RETURN matchingProfiles;
END //
DELIMITER ;

