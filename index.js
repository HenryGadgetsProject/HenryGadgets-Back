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
const { conn, Category, Product, User, Review, Order, OrderDetail, Wishlist, Branch } = require("./db");
const categories = require("./src/data/categories");
const products = require("./src/data/products");
const users = require("./src/data/users");
const reviews = require("./src/data/reviews");
const orderDetails = require("./src/data/orderDetails");
const orders = require("./src/data/orders");
const wishlists = require("./src/data/wishlist");
const branches = require("./src/data/branches");
const { Op } = require('sequelize');
const PORT = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  app.listen(PORT, async function () {
    console.log(`%s listening at ${PORT}`);

    //OrderDetail creation
    await OrderDetail.bulkCreate(orderDetails);
    await Category.bulkCreate(categories);
    await Branch.bulkCreate(branches);

    //Order creation and association
    for (let i = 0; i < orders.length; i++) {
      const findOrderDetail = await OrderDetail.findAll({
        where: {
          id: {
            [Op.in]: orders[i].orderDetId,
          },
        },
      });

      const myOrder = await Order.create({
        state: orders[i].state,
        total_price: orders[i].total_price
      });
      await myOrder.setOrderDetails(findOrderDetail);
    }

    //Review creation
    for (let i = 0; i < reviews.length; i++) {
      const myReview = await Review.create({
        rating: reviews[i].rating,
        description: reviews[i].description,
        title: reviews[i].title
      });
      const findOrderDetail = await OrderDetail.findByPk(i + 1);
      findOrderDetail.setReview(myReview)
    }

    //Product creation and association
    for (let i = 0; i < products.length; i++) {
      console.log('ENTREE SOY PRODCUTS')
      const findCategory = await Category.findAll({
        where: {
          id: {
            [Op.in]: products[i].categories,
          },
        },
      });
      const findOrderDetail = await OrderDetail.findAll({
        where: {
          id: {
            [Op.in]: products[i].orderDetId,
          },
        },
      });

      //let rating = products[i].dataValues.rating.toString();       
      const [myProduct] = await Product.findOrCreate({
        where: {
          id: products[i].id,
          name: products[i].name,
          price: products[i].price,
          stock: products[i].stock,
          description: products[i].description,
          big_image: products[i].big_image,
          rating: products[i].rating,
          is_active: products[i].is_active,
        },
      });
      await myProduct.setCategories(findCategory);
      await myProduct.setOrderDetails(findOrderDetail);
    }   

    // User creation and association
    for (let i = 0; i < users.length; i++) {
      console.log('ENTREE SOY USERS')
      const findReview = await Review.findAll({
        where: {
          id: {
            [Op.in]: users[i].reviews,
          },
        },
      });
      const myWishlist = await Wishlist.create({ name: 'lista' });
      const wishProducts = await Product.findAll({
        where: {
          id: {
            [Op.in]: wishlists[i].prodId,
          },
        },
      });
      myWishlist.addProducts(wishProducts);
      const [myUser] = await User.findOrCreate({
        where: {
          first_name: users[i].first_name,
          last_name: users[i].last_name,
          is_admin: users[i].is_admin,
          email: users[i].email,
          password: users[i].password,
        },
      });
      await myUser.addReviews(findReview);
      await myUser.setWishlist(myWishlist);
    }

    // Other Associations
    for (let i = 0; i < users.length; i++) {
      const findUser = await User.findByPk(i + 1);
      const findOrder = await Order.findAll({
        where: {
          id: {
            [Op.in]: users[i].orderId,
          },
        },
      });
      await findUser.setOrders(findOrder);
    }

    for(let i = 0; i < reviews.length; i++){
      const theOrderDetail = await OrderDetail.findOne({
        where: {
            id: i+1
        },
        include: [{
          model: Product,
          attributes: ['id']
        }]
      })
      const productReviewId = theOrderDetail.dataValues.product_id
      const theProduct = await Product.findOne({
        where: {
          id: productReviewId
        }
      })
      const theReview = await Review.findByPk(i+1)
      theReview.setProduct(theProduct)
    }
    
    console.log('Products and categories pre charged');
  });
});
