import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || '', // tên database, nếu không có sẽ là chuỗi rỗng
  process.env.DATABASE_USERNAME || '', // tên người dùng, nếu không có sẽ là chuỗi rỗng
  process.env.DATABASE_PASSWORD || '', // mật khẩu, nếu không có sẽ là chuỗi rỗng
  {
    host: process.env.DATABASE_HOST || 'localhost', // địa chỉ host, nếu không có sẽ là 'localhost'
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

export default sequelize;
