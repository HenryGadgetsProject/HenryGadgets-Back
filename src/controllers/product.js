const { Product, Category } = require("../../db.js");
const { Sequelize } = require('sequelize')
const { v4: uuidv4 } = require('uuid');


const getAllProducts = async () => {
    try {
        return await Product.findAll(
            {
                include: [{ model: Category, attributes: ['id', 'name'] }]
            }
        );
    } catch (error) {
        return error.message;
    }
}

const getPopularProducts = async () => {
    try {

        return await Product.findAll(
            {
                where: {
                    rating: 5
                },
                limit: 4,
                include: [{ model: Category, attributes: ['id', 'name'] }]
            }
        )


    } catch (e) {

    }
}

const getProductById = async (id) => {
    try {
        const product = await Product.findOne({
            where: {
                id: id
            },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        return product
    } catch (error) {
        return error.message;
    }
}

const getProductsByName = async (name) => {
    try {
        const products = await Product.findAll({
            where: {
                name: { [Sequelize.Op.iLike]: `%${name}%` }
            },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        return products
    } catch (error) {
        return error.message;
    }
}


const createProduct = async (name, price, stock, description, rating, is_active, big_image, categories) => {

    try {
        const categoriesDB = await Category.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: categories,
                }
            }
        })
        const product = await Product.create({
            name,
            price,
            stock,
            description,
            rating,
            is_active,
            big_image
        })
        await product.addProduct(categoriesDB)
        const categoriesNew = categoriesDB.map(t => t.dataValues)

        return ({ ...product.dataValues, categories: categoriesNew })

    } catch (error) {
        return error.message;
    }
}



module.exports = {
    getAllProducts,
    getProductById,
    getProductsByName,
    createProduct,
    getPopularProducts
};
