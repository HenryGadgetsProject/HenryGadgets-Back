const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DT.STRING,
            unique: true,
            allowNull: false
        },
        photo: {
            type: DT.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}