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

// const searchProducts = async (query) => {
//     try {
//         const products = await Product.findAll({
//             where: {
//                 name: { [Sequelize.Op.iLike]: `%${query}%` }
//             },
//             include: [{ model: Category, attributes: ['id', 'name'] }]
//         });
//         return products
//     } catch (error) {
//         return error.message;
//     }
// }



const createProduct = async (id, name, price, rating, big_image, description, is_active, stock, categories) => {


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

const updateProduct = async (id, name, price, rating, big_image, description, is_active, stock, categories) => {

    try {
        const productUpdated = await Product.update(
            {
                name,
                price,
                rating,
                big_image,
                description,
                is_active,
                stock,
                categories
            },
            { where: { id: id } }
        )


        return productUpdated;
    } catch (e) {
        return e.message;
    }
}

// const  updateProduct = async (id)=> {
//     const { id } = req.params;
//     const { name, price, rating, big_image, description, is_active, stock, categories } = req.body
//     const product = await Task.findOne({
//       attributes: ['name','projectid','done','id'],
//       where: {id}
//     })
//     const updatedTask = await Task.update({
//       name,
//       done,
//       projectid
//     },{
//       where: {id}
//     })
//     res.json({
//       message: 'Task Updated',
//       updatedTask
//     })
//   }

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
    createProduct,
    getPopularProducts,
    deleteProduct,
    updateProduct,
};
