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
                isEmail: {
                    msg: "Must be a valid email"
                }
            }
        },
        password: {
            type: DT.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DT.BOOLEAN,
            defaultValue: false
        },
        googleId: {
            type: DT.STRING,
            unique: true,
        },
        facebookUser: {
            type: DT.STRING,
            unique: true,
        },
        status: {
            type: DT.ENUM("active", "disabled", "banned"),
            defaultValue: "active",
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}


