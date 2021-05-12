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


async function createProduct(productInfo, id, next) {

    const productData = {...productInfo, id}

    try {
        const newProduct = await Product.create(productData)
        return `El producto ${newProduct.name} ha sido creado`
    } catch (err) {
        next(err)
    }
}



module.exports = {
    getAllProducts,
    getProductById,
    getProductsByName,
    createProduct,
    getPopularProducts
};
