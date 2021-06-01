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
        },
        is_admin: {
            type: DT.BOOLEAN,
            defaultValue: false
        },
        googleId: {
            type: DT.STRING,
            unique: true,
        },
        status: {
            type: DT.ENUM("active", "disabled", "banned"),
            defaultValue: "active",
        },
        photo: {
            type: DT.STRING,
            defaultValue: "https://images-ext-2.discordapp.net/external/r6IN2xCJUKtoWBmSBMOx_ZJeMHNxM4pxp4atCrC7TR8/https/i.imgur.com/7BQaVxj.png"
        },
        nlsuscribe: {
            type: DT.BOOLEAN,
            allowNull: true,
        }
    },
        {
            timestamps: false,
            underscored: true
        });
}


