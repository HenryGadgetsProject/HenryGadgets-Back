const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {

    const orderProduct = sequelize.define('orders_products', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        unit_price: {
            type: DT.DOUBLE,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        quantity: {
            type: DT.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        }
    },
        {
            timestamps: false,
            underscored: true
        });
};