const { DataTypes } = require('sequelize');
const DT = DataTypes;


module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        first_name: {
            type: DT.STRING,
            allowNull: false
        },
        last_name: {
            type: DT.STRING,
            allowNull: false
        },
        photo: {
            type: DT.TEXT,
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


