const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('image', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        url: {
            type: DT.STRING,
            allowNull: false,
            unique: true
        }
    },
        {
            timestamps: false,
            underscored: true
        });
};