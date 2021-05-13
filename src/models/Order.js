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
        total_amount: {
            type: DT.DOUBLE,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }

    },
        {
            timestamps: true,
            underscored: true
        });
}