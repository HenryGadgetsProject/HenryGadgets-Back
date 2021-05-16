const { Product, Category } = require("../../db.js");
const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getAllProducts = async () => {
  try {
    return await Product.findAll({
      include: [{ model: Category, attributes: ["id", "name"] }],
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
    return res.status(500).json("Not enough Data in Body");
  }
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
      price,
      rating,
      big_image,
      description,
      is_active,
      stock,
    });
    const newProdCat = await newProduct.addCategory(categoriesDB);
    const catNew = categoriesDB.map((c) => c.dataValues);
    newProduct = { ...newProduct.dataValues, categories: catNew };
    return newProduct;
  } catch (error) {
    return error.message;
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
      },
      { where: { id } }
    );
    let prod = Product.findOne({
      where: { id: id },
    });

    if (categories.length > 1) {
      let cat = [];
      for (var i = 0; i < categories.length; i++) {
        let aux = await Category.findOne({
          where: { id: categories[i] },
        });
        Promise.all([aux]).then(([aux]) => {
          cat.push(aux);
        });
      }
      Promise.all([prod, cat]).then(([prod, cat]) => {
        prod.setCategories(cat);
        return prod;
      });
    } else {
      cat = Category.findOne({
        where: { id: categories[0] },
      });
      Promise.all([prod, cat]).then(([prod, cat]) => {
        prod.setCategories(cat);
        return prod;
      });
    }
  } catch (e) {
    return e.message;
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
