const { Category } = require('../../db');

const getAllCategories = async () => {
    try {
        return await Category.findAll();
    } catch (error) {
        return error.message
    }
}

const getCategoryById = async (id) => {
    try {
        const category = await Category.findByPk(id);
        return category;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAllCategories,
    getCategoryById
};
