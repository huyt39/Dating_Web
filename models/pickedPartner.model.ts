// models/pickedPartner.model.ts
import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Partner from './partner.model'; // Import model Partner nếu cần

const PickedPartner = sequelize.define('PickedPartner', {
  pickID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  partnerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,  // Tắt timestamps nếu bảng không có createdAt và updatedAt
  tableName: 'picked_partners',
});

// Thiết lập quan hệ nếu cần
PickedPartner.belongsTo(Partner, { as: 'partner', foreignKey: 'partnerID' });

export default PickedPartner;
