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

const createCategory = async (name, photo, description) => {
    try {
        const category = await Category.create({
            name,
            photo,
            description
        })


        return category;
    } catch (error) {
        return error.message;
    }
}

const updateCategory = async (id, name, photo, description) => {
    try {
        const categoryUpdated = await Category.update(
            {
                name,
                photo,
                description
            },
            { where: { id: id } }
        )
        return categoryUpdated;
    } catch (e) {
        return e.message;
    }
}

const deleteCategory = async (id) => {
    try {
        let categoryDeleted = await Category.destroy({ where: { id: id } });
        return categoryDeleted;
    } catch (e) {
        return e.message;
    }
}



module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
