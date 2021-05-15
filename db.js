require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const { DataTypes } = require("sequelize");
const DT = DataTypes;
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize;
if (process.env.DATABASE_URL !== undefined) {
  console.log("WEB ENVIROMENT");
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.log("LOCAL ENVIROMENT");
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  );
}

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/src/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/src/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Brand,
  Category,
  Image,
  Order,
  Product,
  Review,
  User,
  OrderLine,
} = sequelize.models;

// Aca vendrian las relaciones
Product.hasMany(Image, { foreignKey: { allowNull: false } });
Product.hasMany(Review, { foreignKey: { allowNull: false } });
Product.belongsTo(Brand, { foreignKey: { allowNull: true, type: DT.INTEGER } });

Product.belongsToMany(Category, { through: "products_categories" });
Category.belongsToMany(Product, { through: "products_categories" });

Brand.hasMany(Product, { foreignKey: { allowNull: false } });

Product.belongsToMany(Order, { through: "orders_products" });
Order.belongsToMany(Product, { through: "orders_products" });

User.hasMany(Order, { foreignKey: { allowNull: false } });
User.hasMany(Review, { foreignKey: { allowNull: false } });
Review.belongsTo(User, { foreignKey: { allowNull: false } });


// verifico conexion a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
