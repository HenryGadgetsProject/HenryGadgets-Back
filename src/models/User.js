const { DataTypes } = require('sequelize');
const DT = DataTypes;


module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DT.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: DT.STRING,
            allowNull: false
        },
        last_name: {
            type: DT.STRING,
            allowNull: false
        },
        email: {
            type: DT.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DT.STRING,
            allowNull: false
        },
        country:    {
            allowNull: true,
            type: DT.STRING,
        },
        city: {
            allowNull: true,
            type: DT.STRING,
        },
        street: {
            allowNull: true,
            type: DT.STRING,
        },
        addressnumber: {
            allowNull: true,
            type: DT.INTEGER,
        },
        postcode: {
            allowNull: true,
            type: DT.INTEGER,
        },
        is_admin: {
            type: DT.BOOLEAN,
            allowNull: false
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}


