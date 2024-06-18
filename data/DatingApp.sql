-- Tạo cơ sở dữ liệu dating
CREATE DATABASE dating;
USE dating;

-- Tạo bảng categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(500),
    description LONGTEXT,
    status VARCHAR(20),
    position INT,
    slug VARCHAR(255) NOT NULL,
    deleted TINYINT(1),
    deletedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng partners
CREATE TABLE partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    code VARCHAR(10),
    images LONGTEXT,
    information LONGTEXT,
    status VARCHAR(20),
    position INT,
    slug VARCHAR(255) NOT NULL,
    deleted TINYINT(1),
    deletedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng partners_categories
CREATE TABLE partners_categories (
    partner_id INT,
    category_id INT,
    PRIMARY KEY (partner_id, category_id),
    FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tạo bảng pick
CREATE TABLE pick (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10),
    fullName VARCHAR(10),
    note VARCHAR(500),
    status VARCHAR(20),
    deleted TINYINT(1),
    deletedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng picked_partners
CREATE TABLE picked_partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pickID INT,
    partnerID INT,
    FOREIGN KEY (pickID) REFERENCES pick(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (partnerID) REFERENCES partners(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tạo bảng users
CREATE TABLE users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Major VARCHAR(255),
    DateOfBirth DATE,
    Gender ENUM('man', 'woman'),
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Category VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng user_categories
CREATE TABLE user_categories (
    user_id INT,
    category_id INT,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES users(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO partners (title, code, images, information, status, position, slug, deleted, deletedAt, createdAt, updatedAt)
VALUES 
('Jack', 'P001', '["https://kenh14cdn.com/203336854389633024/2023/1/11/photo-3-1673436433884550875846.jpg", "https://static-images.vnncdn.net/files/publish/2023/1/15/aavaf76-839.jpg?width=0&s=rfpYy9jb13w-wN8BxntZDQ","https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/12/27/775022/Sau-Khi-Jack-Bi-Da-R.jpg"]', 'Sinh năm 97', 'active', 1, 'jack', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sơn Tùng', 'P002', '["https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj", "https://sukienvietsky.com/wp-content/uploads/2024/03/son20tung20mtp.jpeg"]', 'Sếp', 'active', 2, 'tung', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bích Phương', 'P003', '["https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/5/20/347601739762812892234696162022642829033544n-16846027874261401835622.jpg", "https://media.baodautu.vn/Images/chicuong/2019/11/12/suep64nv.jpg","https://media.baodautu.vn/Images/chicuong/2019/11/12/suep64nv.jpg"]', 'Kiếm tiền nạp game', 'active', 3, 'partner-3', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Trấn Thành', 'P004', '["https://toquoc.mediacdn.vn/280518851207290880/2023/8/16/edit-tran-thanh-52-1690739022305120762278-1692174636689804977687.png", "ihttps://images2.thanhnien.vn/528068263637045248/2023/10/2/edit-tran-thanh-2-1696239621088145944557.jpeg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSey66UsQjZXk6h9bcOvnmhE_ptH5GjQVUnLLjSn5WaJQ7FdKkVj8TCW3HH8X-SQ7489Mc&usqp=CAU"]', 'Cậu có muốn làm project cùng tớ?', 'active', 4, 'partner-4', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chipu', 'P005', '["https://media-cdn-v2.laodong.vn/storage/newsportal/2023/11/7/1264149/Chipu-Bld1.jpg?w=800&h=496&crop=auto&scale=both", "https://static-images.vnncdn.net/files/publish/2023/4/5/chipu-672.jpg","https://cdn.24h.com.vn/upload/4-2023/images/2023-10-16/387451826_1529246314561451_543983024176648826_n-1697442361-929-width1125height1345.jpg"]', 'Bọn mình cùng học thật tốt nhé', 'active', 5, 'partner-5', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Soobin', 'P006', '["https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/9/9/6/1/9961cac7d49033610f0125e7c57f8cb2.jpg", "https://tudienwiki.com/wp-content/uploads/2023/02/Soobin-Hoang-Son.jpg","https://sohanews.sohacdn.com/zoom/480_300/160588918557773824/2020/6/10/photo1591787905481-15917879058171533893897.jpg"]', 'Chào cậu! Cậu muốn tìm người học cùng à?', 'active', 6, 'partner-6', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Binz', 'P007', '["https://nld.mediacdn.vn/2020/7/2/binz-bts-chon-3495-159365391024560627410.jpg", "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/6/842257/Binz.jpg","https://cdn-images.vtv.vn/562122370168008704/2023/9/13/screen-shot-2023-09-13-at-085712-1694570276778370591335.png"]', 'Tớ muốn tìm người kèm giải tích!', 'active', 7, 'partner-7', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gil', 'P008', '["https://thanhnien.mediacdn.vn/Uploaded/khanhntm/2022_12_11/318180176-1316472709140095-2759276866545206527-n-898.jpg", "https://thanhnien.mediacdn.vn/Uploaded/hienth/2022_12_03/gil-le-7036.jpg","https://35express.org/wp-content/uploads/2020/01/mot-so-hinh-anh-ve-gil-le-4-35express.jpg"]', 'I want to study babe', 'active', 8, 'partner-8', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rhymastic', 'P009', '["https://media-cdn-v2.laodong.vn/storage/newsportal/2022/1/8/992996/Hinh_2_1_Cba7e1aefeg.jpg", "https://media-cdn-v2.laodong.vn/storage/newsportal/2021/10/2/959628/62306503_37991153954.jpg\","https://media.saodaily.com/storage/files/duonghuyen/2021/09/30/rhymastic-thumb-140510.jpeg"]', 'Rap or learn?', 'active', 9, 'partner-9', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Min', 'P0010', '["https://vcdn1-giaitri.vnecdn.net/2022/03/05/MIN2-1646448104-6583-1646449221.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=HpgQwfSaYVU6yRDg_emSZw", "https://vnn-imgs-f.vgcloud.vn/2020/03/05/14/phong-cach-thoi-trang-tac-ke-hoa-cua-nu-ca-si-hat-ghen-co-vy-1.jpg","https://kols.com.vn/wp-content/uploads/2019/10/65211847_10216568261973651_241743003054505984_n.jpg"]', 'Ngoài giờ học tớ sẽ hát cho cậu nghe nhé', 'active', 10, 'partner-10', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Messi', 'P0011', '["https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg", "https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/6/13/lionel-messi-argentina-inter-miami-1718233460676780392078.jpeg","https://cul.6686live.info/upload/bachdangco_com/post/images/2023/08/25/63/lionel-messi-la-ai.jpg"]', 'Chúng mình sẽ đá bóng xả stress sau học nhé!', 'active', 11, 'partner-11', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO categories (title, image, description, status, position, slug, deleted, deletedAt, createdAt, updatedAt)
VALUES 
('Cùng nhau qua môn', 'https://fami.hust.edu.vn/wp-content/uploads/sami_logo_34_ducvt_13-.jpg', 'cùng qua môn', 'active', 1, 'category-1', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cùng đạt học bổng', 'https://thecollegepod.com/wp-content/uploads/2020/07/Scholarship_AdobeStock_206784836-copy.jpeg', 'cùng đạt học bổng', 'active', 2, 'category-2', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ghép đôi làm project', 'https://vtitech.vn/wp-content/uploads/2022/05/884e7097-14d0-4a71-b80b-cd8a70efd13b.jpg', 'cùng làm project', 'active', 3, 'category-3', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ghép đôi học hành', 'https://img.freepik.com/premium-photo/students-studying-together-outdoors-campus_53876-148590.jpg', 'học hành với nhau', 'active', 4, 'category-4', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bạn thân khác giới', 'https://dep.com.vn/wp-content/uploads/2024/04/Lovely-Runner-10.jpg', 'yêu đương song song học hành', 'active', 5, 'category-5', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gắn bó lâu dài', 'https://www.focusonthefamily.com/wp-content/uploads/2024/01/get-married-shutterstock-589431530-65b82ea6e69f6.webp', 'tìm người gắn bó', 'active', 5, 'category-5', 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO partners_categories (partner_id, category_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 3), 
(5, 4),
(6, 5),
(7, 6),
(8, 1),
(9, 2),
(10, 3),
(11, 4),
(1, 5),
(2, 6),
(3, 1),
(5, 2),
(6, 3),
(7, 4),
(8, 5),
(9, 6),
(10, 1),
(11, 2);



