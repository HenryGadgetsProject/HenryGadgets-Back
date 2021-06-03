const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    sequelize.define('offer', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        target: {
            type: DT.STRING,
            allowNull: false,
        },
        targetName: {
            type: DT.STRING,
            allowNull: false,
        },
        discount: {
            type: DT.FLOAT,
            allowNull: false,
        },
        duration: {
            type: DT.FLOAT,
            allowNull: false,
        },
        active: {
            type: DT.BOOLEAN,
            allowNull: false
        }
    },
        {
            underscored: true
        });
}       