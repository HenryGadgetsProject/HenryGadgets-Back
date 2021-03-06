const { Product, Category } = require('../../db');
const { Sequelize } = require('sequelize')

const searchProducts = async (query) => {
    try {
        const products = await Product.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${query}%` } },
                    { description: { [Sequelize.Op.iLike]: `%${query}%` } }
                ],
            },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        return products
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    searchProducts
}
