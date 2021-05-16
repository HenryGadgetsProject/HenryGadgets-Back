const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: DT.STRING,
            allowNull: false,
        },
        unit_price: {
            type: DT.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DT.INTEGER,
            allowNull: false,
        },
    },
        {
            timestamps: false,
            underscored: true
        });
}
