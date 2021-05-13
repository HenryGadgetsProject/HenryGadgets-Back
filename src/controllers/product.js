const { Product, Category } = require("../../db.js");
const { Sequelize } = require('sequelize')
const { v4: uuidv4 } = require('uuid');


const getAllProducts = async () => {
    try {
        return await Product.findAll(
            {
                include: [{ model: Category, attributes: ['id', 'name'] }],
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



const getProductsByCatName = async (catName) => {
    try {
        const prdByCatName = await Product.findAll({
            include: [{
                model: Category,
                where: {
                    name: {
                        [Sequelize.Op.eq]: `${catName}`
                    }
                }
            }]
        })

        return prdByCatName
    } catch (error) {
        return error.message;
    }


    // router.get('/categories/:nameCat', async (req, res) => {
//     const { nameCat } = req.params
//     const products = await Product.findAll({
//         include: [
//             {
//                 model: Category,
//                 where: {
//                     [Op.or]: [
//                         { name: nameCat }
//                     ]
//                 }
//             }
//         ]
//     })
//     return res(products)
// })
	// catName = catName.toLowerCase();
	// let count = 0;
	// Product.count({
	// 	include: [
	// 		{
	// 			model: Category,
	// 			where: {
	// 				[Op.or]: [
	// 					{ name: catName }
	// 				]
	// 			}
	// 		}
	// 	]
	// })
	// 	.then(data => {
	// 		count = data;
	// 	})
	// Product.findAll({
	// 	include: [
	// 		{
	// 			model: Category,
	// 			where: {
	// 				[Op.or]: [
	// 					{ name: catName }
	// 				]
	// 			}
	// 		}
	// 	]
	// })
	// 	.then(data => res.json({ count, results: data }))
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


const createProduct = async (
    id,
    name,
    price,
    rating,
    big_image,
    description,
    is_active,
    stock,
    categories
) => {

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


const updateProduct = async (
    id,
    name,
    price,
    rating,
    big_image,
    description,
    is_active,
    stock,
    categories
) => {

    // const t = await sequelize.transaction();

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
            { where: { id } }
        )

        // const productUpdated = await Product.findByPk(id);
        // productUpdated.categories.forEach(category => category.destory({ transaction: t}));
        // console.log('el producto encontrado fue', productUpdated);
        // productUpdated.categories.forEach(category => category.add({ transaction: t}));
        //     productUpdated.update(
        //         {
        //             name,
        //             price,
        //             rating,
        //             big_image,
        //             description,
        //             is_active,
        //             stock,
        //             categories
        //         },
        //         { transaction: t }
        //     );
        //     await t.commit();
        // } catch {
        //     await t.rollback();
        // }


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
    getProductsByCatName,
    createProduct,
    getPopularProducts,
    deleteProduct,
    updateProduct,
};
