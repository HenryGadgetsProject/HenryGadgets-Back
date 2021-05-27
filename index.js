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
const { conn, Category, Product, User, Review } = require("./db");
const { assignCategories } = require("./src/controllers/product");
const categories = require("./src/data/categories");
const products = require("./src/data/products");
const users = require("./src/data/users");
const reviews = require("./src/data/reviews")
const PORT = process.env.PORT || 3001;

async function addProductInReview(idRe, product){
    let producttr = await Product.findOne({
      where: {
        id: product.id
      }
    }).then(async (re)=> {
        let result = await re.addReview([idRe])
        return result  
    })
    return producttr
}

function catsBulk(products) {
  products.map((x) => assignCategories(x.id, x.categories[0], true));
}
async function reviewsBulk(reviews, product) {   
  reviews.map((x,i) => addProductInReview(x.id, product[i]))
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  User.bulkCreate(users).then(() => {
    Review.bulkCreate(reviews).then((Truereviews) => {
      Category.bulkCreate(categories).then(() => {
        Product.bulkCreate(products).then(() => {
          catsBulk(products)
          reviewsBulk(Truereviews, products);
        });
      })
    });
  })
})

app.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
});
