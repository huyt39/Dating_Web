import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Category from "./category.model";
import UserCategory from "./userCategory.model";

// Định nghĩa các thuộc tính của User
interface UserAttributes {
  UserID: number;
  Name: string;
  Major?: string;
  DateOfBirth?: Date | null;
  Gender: 'man' | 'woman';
  Email: string;
  Password: string;
  Category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các thuộc tính mà không bắt buộc phải cung cấp khi tạo đối tượng
interface UserCreationAttributes extends Optional<UserAttributes, 'UserID'> {}

// Tạo class User với các thuộc tính được định nghĩa
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public UserID!: number;
  public Name!: string;
  public Major!: string;
  public DateOfBirth!: Date | null;
  public Gender!: 'man' | 'woman';
  public Email!: string;
  public Password!: string;
  public Category!: string;

  // Thời gian tạo và cập nhật
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addCategory!: (category: typeof Category) => void;
}

User.init(
  {
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
      type: DataTypes.DATE,
      allowNull: true
    },
    Gender: {
      type: DataTypes.ENUM('man', 'woman'),
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
    },
    Category: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true // Kích hoạt timestamps
  }
);

User.belongsToMany(Category, { through: UserCategory, foreignKey: 'UserID' });
export default User;
