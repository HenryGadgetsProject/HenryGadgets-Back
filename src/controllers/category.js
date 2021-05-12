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

const createCategory = async (name, photo) => {

    try {
        const category = await Category.create({
            name,
            photo
        })
        return category;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
};
