CREATE DATABASE dating_app;
USE dating_app;

-- Table for categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    description TEXT,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    position INT,
    slug VARCHAR(255),
    deleted TINYINT(1) DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slug (slug)
);

CREATE INDEX idx_categories_title ON categories (title);

-- Table for users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    date_of_birth DATE,
    gender ENUM('man', 'woman') NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_name ON users (name);

-- Table for partners
CREATE TABLE partners (
    partner_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    partner_code VARCHAR(10) UNIQUE,
    images TEXT,
    information TEXT,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    position INT,
    slug VARCHAR(255),
    deleted TINYINT(1) DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slug (slug)
);

CREATE INDEX idx_partners_title ON partners (title);

-- Junction table for partner categories
CREATE TABLE partner_categories (
    partner_id INT,
    category_id INT,
    PRIMARY KEY (partner_id, category_id),
    FOREIGN KEY (partner_id) REFERENCES partners(partner_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Junction table for user categories
CREATE TABLE user_categories (
    user_id INT,
    category_id INT,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table for picks
CREATE TABLE picks (
    pick_id INT AUTO_INCREMENT PRIMARY KEY,
    pick_code VARCHAR(10) UNIQUE,
    full_name VARCHAR(255),
    note VARCHAR(500),
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    deleted TINYINT(1) DEFAULT 0,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_picks_full_name ON picks (full_name);

-- Table for pick details
CREATE TABLE pick_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pick_id INT,
    partner_id INT,
    FOREIGN KEY (pick_id) REFERENCES picks(pick_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (partner_id) REFERENCES partners(partner_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_pick_details_pick_id ON pick_details (pick_id);
CREATE INDEX idx_pick_details_partner_id ON pick_details (partner_id);
