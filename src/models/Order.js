const { DataTypes } = require('sequelize');
const D = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('order', {
        email: {
            type: D.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        total_amount: {
            type: D.DOUBLE,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        state: {
            type: D.ENUM('created', 'processing', 'completed', 'canceled'),
            defaultValue: 'created',
            allowNull: false
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}