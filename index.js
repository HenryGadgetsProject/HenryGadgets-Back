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
const { categories } = require('./src/data/dummyCategories')
const { products } = require('./src/data/dummyProduct')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    Category.bulkCreate(categories).then(() => {
        Product.bulkCreate(products).then(() => {
            // Handler_category.bulkCreate(hc)
        })
    })
})

app.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
});
