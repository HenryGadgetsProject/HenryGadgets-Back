const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('brand', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DT.STRING,
            unique: true,
            allowNull: false
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}