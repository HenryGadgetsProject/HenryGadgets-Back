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
    logging: false,
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
      logging: false,
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
  Branch,
  Category,
  Image,
  Order,
  Product,
  Review,
  User,
  OrderDetail,
  NewsletterOption,
  Offer,
  Wishlist,
} = sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Order);
User.hasMany(Review);
User.hasOne(Wishlist);

Wishlist.belongsTo(User);
Wishlist.belongsToMany(Product, { through: 'wishlist_product' });

Product.hasMany(Image);
Product.hasMany(Review);
Product.hasMany(OrderDetail);
Product.belongsToMany(Category, { through: "products_categories" });
Product.belongsToMany(Wishlist, { through: 'wishlist_product' });

Category.belongsToMany(Product, { through: "products_categories" });

Order.hasMany(OrderDetail);
Order.belongsTo(User);

OrderDetail.belongsTo(Order);
OrderDetail.belongsTo(Product);
OrderDetail.hasOne(Review);

Review.belongsTo(User);
Review.belongsTo(Product);
Review.belongsTo(OrderDetail);


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
