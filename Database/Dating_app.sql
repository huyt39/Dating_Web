CREATE DATABASE DatingApp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE DatingApp;

-- Bảng Users
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);

CREATE INDEX idx_users_email ON Users (Email);

-- Bảng Gender
CREATE TABLE Gender (
    GenderID INT AUTO_INCREMENT PRIMARY KEY,
    GenderName VARCHAR(50) NOT NULL
);

INSERT INTO Gender (GenderName) VALUES ('Man'), ('Woman');

-- Bảng RelationshipType
CREATE TABLE RelationshipType (
    RelationshipTypeID INT AUTO_INCREMENT PRIMARY KEY,
    RelationshipTypeName VARCHAR(255) NOT NULL
);

INSERT INTO RelationshipType (RelationshipTypeName) VALUES 
('Long-term partner'), 
('Long-term, open to short'), 
('Short-term, open to long'), 
('Short-term fun'), 
('New friends'), 
('Still figuring it out');

-- Bảng Profiles
CREATE TABLE Profiles (
    ProfileID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Major VARCHAR(255),
    Class VARCHAR(50),
    Country VARCHAR(100),
    DateOfBirth DATE,
    GenderID INT NOT NULL,
    Interest TEXT, 
    Moreaboutyou TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (GenderID) REFERENCES Gender(GenderID)
);

CREATE INDEX idx_profiles_userid ON Profiles (UserID);
CREATE INDEX idx_profiles_name ON Profiles (Name);

-- Bảng InterestedInGender
CREATE TABLE InterestedInGender (
    ProfileID INT NOT NULL,
    GenderID INT NOT NULL,
    PRIMARY KEY (ProfileID, GenderID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID) ON DELETE CASCADE,
    FOREIGN KEY (GenderID) REFERENCES Gender(GenderID)
);

CREATE INDEX idx_interestedingender_profileid ON InterestedInGender (ProfileID);
CREATE INDEX idx_interestedingender_genderid ON InterestedInGender (GenderID);

-- Bảng InterestedInRelation
CREATE TABLE InterestedInRelation (
    ProfileID INT NOT NULL,
    RelationshipTypeID INT NOT NULL,
    PRIMARY KEY (ProfileID, RelationshipTypeID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID) ON DELETE CASCADE,
    FOREIGN KEY (RelationshipTypeID) REFERENCES RelationshipType(RelationshipTypeID)
);

CREATE INDEX idx_interestedinrelation_profileid ON InterestedInRelation (ProfileID);
CREATE INDEX idx_interestedinrelation_relationshiptypeid ON InterestedInRelation (RelationshipTypeID);

-- Bảng Messages
CREATE TABLE Messages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    SenderUserID INT NOT NULL,
    ReceiverUserID INT NOT NULL,
    Content TEXT NOT NULL,
    FOREIGN KEY (SenderUserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ReceiverUserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE INDEX idx_messages_senderuserid ON Messages (SenderUserID);
CREATE INDEX idx_messages_receiveruserid ON Messages (ReceiverUserID);

-- Bảng Swipe
CREATE TABLE Swipe (
    SwipeID INT AUTO_INCREMENT PRIMARY KEY,
    SwiperUserID INT NOT NULL,
    SwipedUserID INT NOT NULL,
    Action ENUM('like', 'dislike') NOT NULL,
    FOREIGN KEY (SwiperUserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (SwipedUserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE INDEX idx_swipe_swiperuserid ON Swipe (SwiperUserID);
CREATE INDEX idx_swipe_swipeduserid ON Swipe (SwipedUserID);
CREATE INDEX idx_swipe_action ON Swipe (Action);

-- Bảng Matches
CREATE TABLE Matches (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    UserID1 INT NOT NULL,
    UserID2 INT NOT NULL,
    FOREIGN KEY (UserID1) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (UserID2) REFERENCES Users(UserID) ON DELETE CASCADE,
    UNIQUE (UserID1, UserID2)
);

CREATE INDEX idx_matches_userid1 ON Matches (UserID1);
CREATE INDEX idx_matches_userid2 ON Matches (UserID2);

-- Bảng Photos
CREATE TABLE Photos (
    PhotoID INT AUTO_INCREMENT PRIMARY KEY,
    ProfileID INT NOT NULL,
    PhotoURL VARCHAR(255) NOT NULL,
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID) ON DELETE CASCADE
);

CREATE INDEX idx_photos_profileid ON Photos (ProfileID);









