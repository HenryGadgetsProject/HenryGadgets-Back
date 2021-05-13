const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
    // defino el modelo


    const Review = sequelize.define('review', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        rating: {
            type: DT.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 5
            }
        },
        description: {
            type: DT.TEXT,
            allowNull: true,
            defaultValue: '',
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}