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
const { conn, Category, Product } = require("./db");
const categories = require('./src/data/categories')
const products = require('./src/data/products')
const { createCategory } = require('./src/controllers/category')
const { createProduct } = require('./src/controllers/product')



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    // Product.bulkCreate(products)



    categories.forEach(cat => Category.create(cat));

    products.forEach(product => Product.create(product))

    // Category.bulkCreate(categories).then(() => {
    // Product.bulkCreate(products).then(() => {
    //     // Handler_category.bulkCreate(hc)
    // })
    // })
})

app.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
});
