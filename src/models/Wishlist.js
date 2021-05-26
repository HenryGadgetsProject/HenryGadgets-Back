const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('wishlist', {
        name: {
            type: DT.STRING,
            unique: false,
        },
    },
        {
            underscored: true
        });
}       