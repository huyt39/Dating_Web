Để có thể chạy được web, cần thực hiện như sau:
1. Cài npm bằng cách gõ "npm init" trong Terminal.
2. Khi đó, sẽ xuất hiện file package.json trong thư mục dự án (trong trường hợp chưa có).
   Cần phải đảm bảo tất cả các file/thư mục trong mục "dependencies" và "devDependencies" trong file package.json đã đầy đủ như trong file của nhóm.
   Bên cạnh đó, mục "scripts" trong file package.json cũng cần đầy đủ nội dung như sau (trong trường hợp chưa thấy đủ):
    "start": "nodemon index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
3. Sau khi đảm bảo đã đầy đủ các file, thư mục cần thiết và thực hiện đầy đủ các bước trên, gõ câu lệnh "npm start" trong Terminal.
   Mở trình duyệt với đường dẫn localhost:3000 để hiển thị và sử dụng web.
