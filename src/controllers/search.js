const { Product, Category } = require("../../db.js");
const { Sequelize } = require('sequelize')

const searchProducts = async (query) => {
    console.log('***********************************************', query)
    try {
        const products = await Product.findAll({
            where: {
                name: { [Sequelize.Op.iLike]: `%${query}%` }
            },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        return products
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    searchProducts
}
