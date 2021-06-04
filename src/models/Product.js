const { DataTypes, INTEGER } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DT.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DT.STRING,
            allowNull: false,
        },
        price: {
            type: DT.DOUBLE,
            allowNull: false
        },
        stock: {
            type: DT.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        description: {
            type: DT.TEXT,
            allowNull: false
        },
        rating: {
            type: DT.DOUBLE,
        },
        is_active: {
            type: DT.BOOLEAN,
            allowNull: false
        },
        big_image: {
            type: DT.STRING,
        },
        discount: {
            type: DT.FLOAT,
            defaultValue: 0,            
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}