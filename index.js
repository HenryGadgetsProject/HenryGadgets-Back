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
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    Category.bulkCreate(categories).then(() => {
        Product.bulkCreate(products).then(() => {
            // Handler_category.bulkCreate(hc)
        })
    })
})

app.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
});
