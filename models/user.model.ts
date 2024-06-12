import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define("User", {
  UserID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Major: {
    type: DataTypes.STRING(255)
  },
  DateOfBirth: {
    type: DataTypes.DATE
  },
  Gender: {
    type: DataTypes.ENUM('nam', 'nu'),  // Sử dụng ENUM cho giới tính
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: true, // Quản lý tự động các trường createdAt và updatedAt
});

export default User;
