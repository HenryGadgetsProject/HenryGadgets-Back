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


const createProduct = async (productInfo, id, next) => {

    const productData = { ...productInfo, id }

    try {
        const newProduct = await Product.create(productData)
        return `El producto ${newProduct.name} ha sido creado`
    } catch (err) {
        next(err)
    }
}

const createProductB = async (id, name, price, rating, big_image, description, is_active, stock, categories) => {


    if (!name) {
        return res.status(500).json("Not enough Data in Body")
    }
    try {
        const newProduct = await Product.create({
            id,
            name,
            price,
            rating,
            big_image,
            description,
            is_active,
            stock
        });
        const newProdCat = await newProduct.addCategory(categories)
        return newProdCat;
    } catch (error) {
        return error.message
    }
}

const deleteProduct = async (id) => {
    try {
        let productDeleted = await Product.destroy({ where: { id: id } });
        return productDeleted;
    } catch (e) {
        return e.message;
    }
}



module.exports = {
    getAllProducts,
    getProductById,
    getProductsByName,
    createProduct,
    getPopularProducts,
    deleteProduct,
    createProductB,
};
