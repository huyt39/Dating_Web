import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize( //dat ten bien la gi cung duoc, khong nhat thiet la sequelize
 process.env.DATABASE_NAME,   //ten db
 process.env.DATABASE_USERNAME, //username de dang nhap, mac dinh la root
 process.env.DATABASE_PASSWORD, //password mac dinh de trong
  {
    host: process.env.DATABASE_HOST, //link hosting, sau nay thay bang link online
    dialect: 'mysql'
  }
);


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize;