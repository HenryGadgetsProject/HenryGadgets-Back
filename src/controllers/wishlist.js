const { Wishlist, Product, User } = require('../../db');

const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    let data = await Wishlist.findOne({
      where: {
        user_id: userId
      }, include: {
        model: Product,
        attributes: [
          'id',
          'name',
          'price',
          'description',
          'big_image',
          'rating',
          'stock',
        ]
      }
    })
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
}

const addProduct = async (req, res) => {
  const { userId, prodId } = req.params;
  const product = await Product.findByPk(prodId);
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    const wishlist = await Wishlist.findOne({
      where: {
        user_id: user.id
      },
    });

    if (!wishlist) {
      const wishlist = await Wishlist.create({
        name: 'Wishlist',
      });
      await user.setWishlist(wishlist)
      await wishlist.addProduct(product)
    } else {
      await wishlist.addProduct(product)
    }

    const updatedWishlist = await Wishlist.findOne({
      where: {
        user_id: userId,
      },
      attributes: ['id', 'name'],
      include: {
        model: Product,
        attributes: [
          'id',
          'name',
          'price',
          'description',
          'big_image',
          'rating',
          'stock',
        ],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(updatedWishlist);
  } catch (err) {
    console.log(err);
  }
}

const deleteItem = async (req, res) => {
  const { userId, prodId } = req.params
  try{
    const wishlist = await Wishlist.findOne({
      where: {
        user_id: userId
      }
    }),

    product = await Product.findByPk(prodId);

    await wishlist.removeProduct(product);

    const newwishlist = await Wishlist.findOne({
      where: {
          user_id: userId,
      },
      attributes: ['id', 'name'],
      include: {
          model: Product,
          attributes: [
              'id',
              'name',
              'price',
              'description',
              'big_image',
              'rating',
              'stock',
          ],
          through: {
          attributes: [],
          },
      },
    });

    return res.json(newwishlist)
  } catch (error) {
    console.log(error)
  }
}

const deleteWishlist = async (req, res) => {
  const { userId } = req.params;
  try{
      let wishlist = await Wishlist.findOne({ where: { user_id: parseInt(userId) }});
      res.send({ message: 'wishlist borrada '})
      wishlist.destroy()
  }catch(err){
      res.json(err);
      return console.log(err);
  }
}

module.exports = {
    getWishlist,
    deleteWishlist,
    addProduct,
    deleteItem,
}