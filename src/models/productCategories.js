const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {

    const productCategory = sequelize.define('products_categories', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
    },
        {
            timestamps: false,
            underscored: true
        });
};