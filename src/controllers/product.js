const { Product, Category, Review } = require("../../db.js");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getAllProducts = async () => {
  try {
    return await Product.findAll({
      include: [{ model: Category, attributes: ["id", "name"] }, Review],
    });
  } catch (error) {
    return error.message;
  }
};

const getPopularProducts = async () => {
  try {
    return await Product.findAll({
      where: {
        rating: 5,
      },
      limit: 4,
      include: [{ model: Category, attributes: ["id", "name"] }],
    });
  } catch (e) {}
};

const getProductById = async (id) => {
  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
      include: [{ model: Category, attributes: ["id", "name"] }],
    });
    return product;
  } catch (error) {
    return error.message;
  }
};

const getProductsByCatName = async (catName) => {
  try {
    const prdByCatName = await Product.findAll({
      include: [
        {
          model: Category,
          where: {
            name: {
              [Sequelize.Op.eq]: `${catName}`,
            },
          },
        },
      ],
    });

    return prdByCatName;
  } catch (error) {
    return error.message;
  }
};

const createProduct = async (req, res) => {
  const id = uuidv4();
  const {
    name,
    price,
    rating,
    big_image,
    description,
    is_active,
    stock,
    categories,
  } = req.body;
  try {
    const categoriesDB = await Category.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: categories,
        },
      },
    });
    let newProduct = await Product.create({
      id,
      name,
      rating,
      price,
      big_image,
      description,
      is_active,
      stock,
    });
    const newProdCat = await newProduct.addCategory(categoriesDB);
    const catNew = categoriesDB.map((c) => c.dataValues);
    newProduct = { ...newProduct.dataValues, categories: catNew };
    
    return res.status(200).json(newProduct);
  } catch (err) {
    res.send(error);
  }
};

const assignCategories = async (prodId, catId, firstLoad = false) => {
  let prod = Product.findOne({
    where: { id: prodId },
  });
  let cat = Category.findOne({
    where: { id: catId },
  });
  Promise.all([prod, cat]).then(([prod, cat]) => {
    prod.addCategories(cat);
    if (firstLoad) {
      setTimeout(() => {
        console.log("FIN DE CARGA DE DUMMY DATA");
      }, 2000);
    }
    return prod;
  });
};

const deleteCategories = async (prodId, catId) => {
  let prod = Product.findOne({
    where: { id: prodId },
  });
  let cat = Category.findOne({
    where: { id: catId },
  });
  Promise.all([prod, cat]).then(([prod, cat]) => {
    prod.removeCategories(cat);
    res.status(200).json({ message: "Category deleted." });
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    stock,
    description,
    is_active,
    big_image,
    categories
  } = req.body;
  try {
    let prod = Product.update({
      name,
      price,
      stock,
      description,
      is_active,
      big_image,
    }, {
      where: {
        id: id
      }
    });
    // for(let i = 0; i < categories.length; i++) {
    //   const category = await Category.findOne({
    //     where: {
    //       id: categories[i].id
    //     }
    //   })
    //   await prod.setCategory(category)
    // }
    let product = Product.findOne({
      where: {
        id: id,
      },
      include: {
        model: Category
      }
    })
    return res.send(product)
  } catch (e) {
    return console.log(e);
  }
};

//update

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCatName,
  createProduct,
  updateProduct,
  assignCategories,
  getPopularProducts,
  deleteCategories,
};
