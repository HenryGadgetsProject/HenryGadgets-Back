const { Wishlist, Product, User } = require('../../db');

const getWishlist = async (req, res) => {
    let id = req.params;

    try {
        let data = await User.findOne({
        where: {
            id: id,
        },
        attributes: ['id', 'first_name', 'last_name'],
        include: {
            model: Wishlist,
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
        },
        });

        return res.json(data);
    } catch (err) {
        res.json(err);
        return console.log(err);
    }
}

const postWishlist = async (req, res) => {
    const { userId, listName } = req.params;

    try {
        let newWishlist = await Wishlist.create({
        name: listName,
        });

        let newUser = await User.findByPk(userId);

        await newUser.addWishlists(newWishlist);

        return res.json(newWishlist);
    } catch (err) {
        console.log(err);
    }
}

const editWishlist = async (req, res) => {
    const { wishlistId, productId, action } = req.params,
    result = [];

    let wishlist = await Wishlist.findByPk(wishlistId),
    product = await Product.findByPk(productId);

    if (action === 'remove') {
        await product.removeWishlists(wishlist);
    } else if (action === 'add') {
        await product.addWishlists(wishlist);

        wishlist = await Wishlist.findOne({
        where: {
            id: wishlistId,
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

        result.push(wishlist);
        result.push(204);
    } else {
        result.push({ message: 'no changes made, action necessary in params' });
        result.push(400);
    }
    res.json(result[0]).status(result[1]);
}

const deleteWishlist = async (req, res) => {
    const { wishlistId } = req.params;
    try{
        let wishlist = await Wishlist.findOne({ where: { id: wishlistId } });
        wishlist?wishlist.destroy():null;
        res.json({message:`wishlist ${wishlistId} eliminada`}).status(204)
    }catch(err){
        res.json(err);
        return console.log(err);
    }
}



module.exports = {
    getWishlist,
    editWishlist,
    postWishlist,
    deleteWishlist,
}