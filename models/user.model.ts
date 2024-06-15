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
    type: DataTypes.ENUM('nam', 'nu'),
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
  timestamps: false  // Tắt timestamps
});

export default User;
