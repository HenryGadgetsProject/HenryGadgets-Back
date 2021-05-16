//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = require("./app");
const { conn, Category, Product, User } = require("./db");
const { assignCategories } = require("./src/controllers/product");
const categories = require("./src/data/categories");
const products = require("./src/data/products");
const users = require("./src/data/users")
const PORT = process.env.PORT || 3001;

function catsBulk(products) {
  products.map((x) => assignCategories(x.id, x.categories[0], true));
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  User.bulkCreate(users).then(() => {
    Category.bulkCreate(categories).then(() => {
      Product.bulkCreate(products).then(() => {
        catsBulk(products);
      });
    });
  })
})

app.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
});
