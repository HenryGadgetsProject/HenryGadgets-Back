const { DataTypes } = require('sequelize');
const DT = DataTypes;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('product', {
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
            defaultValue: 0,
            allowNull: false
        },
        is_active: {
            type: DT.BOOLEAN,
            allowNull: false
        },
        big_image: {
            type: DT.STRING,
            validate: {
                isUrl: true
            }
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}