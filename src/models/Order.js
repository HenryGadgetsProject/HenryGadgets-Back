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
        state: {
            type: DT.ENUM({
                values: ["cart", "created", "processing", "cancelled", "completed"],
                allowNull: false,
            }),
        },
        total_price: {
            type: DT.FLOAT,
        },
    },
        {
            underscored: true
        });
}
