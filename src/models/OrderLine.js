const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orderline', {
        qty: {
            type: DT.INTEGER,
        }
    },
        {
            timestamps: false,
            underscored: true
        });
};