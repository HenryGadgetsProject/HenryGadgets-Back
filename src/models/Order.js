const { DataTypes, Sequelize } = require("sequelize");
const DT = DataTypes;

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DT.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      state: {
        type: DT.ENUM({
          values: ["cart", "created", "processing", "cancelled", "completed"],
          allowNull: false,
        }),
      },
      total_price: {
        type: DT.FLOAT,
      },
      city: {
        type: DT.STRING,
      },
      street: {
        type: DT.STRING,
      },
      phone_number: {
        type: DT.STRING,
      },
      country: {
        type: DT.STRING,
      },
      created_at: {
        type: DT.DATE,
        defaultValue:  Sequelize.NOW
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
};
