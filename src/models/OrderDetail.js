const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orderDetail', {
        quantity: {
            type: DT.INTEGER,
        },
        unit_price: {
            type: DT.FLOAT
        },
        product_id: {
            type: DT.UUID,
        }
    },
        {
            timestamps: false,
            underscored: true
        });
};

