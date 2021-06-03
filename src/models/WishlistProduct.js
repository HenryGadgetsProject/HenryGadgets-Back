const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('wishlistProduct', {},
        {
            timestamps: false,
            underscored: true
        });
};

