const { DataTypes } = require('sequelize');
const DT = DataTypes;

module.exports = (sequelize) => {
  sequelize.define('branch', {
    id: {
        type: DT.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
      type: DT.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DT.STRING,
      unique: true,
      allowNull: false,
    },
    atention: {
      type: DT.STRING,
    },
    latitud: {
      type: DT.FLOAT,
    },
    longitud: {
      type: DT.FLOAT,
    },
  });
};