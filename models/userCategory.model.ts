import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserCategory extends Model {}

UserCategory.init({
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'UserID'
    }
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'user_categories',
  sequelize,
  timestamps: false
});

export default UserCategory;
