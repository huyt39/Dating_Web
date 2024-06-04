
import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Partner = sequelize.define("Partner",{  //ten
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(10)
    },
    images: {
        type: DataTypes.TEXT('long')
    },
    information: {
        type: DataTypes.TEXT('long')
    },
    status: {
        type: DataTypes.STRING(20)
    },
    position: {
        type: DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
},{
    tableName: "partners",  //ten bang trong db
    timestamps: true, //tu dong quan ly updatedAt va createdAt
});

export default Partner;
