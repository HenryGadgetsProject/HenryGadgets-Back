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
    const newProduct = await Product.create({
      id,
      name,
      price,
      rating,
      big_image,
      description,
      is_active,
      stock,
    });
    const newProdCat = await newProduct.addCategory(categories);
    return newProdCat;
  } catch (error) {
    return error.message;
  }
};

const assignCategories = async (prodId, catId) => {
  let prod = Product.findOne({
    where: { id: prodId },
  });
  let cat = Category.findOne({
    where: { id: catId },
  });
  Promise.all([prod, cat]).then(([prod, cat]) => {
    prod.addCategories(cat);
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
  const productData = { ...productInfo, id };
  try {
    const newProduct = await Product.create(productData);
    console.log(newProduct);
    return `El producto ${newProduct.name} ha sido creado`;
  } catch (err) {
    next(err);
  }
};

//update

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCatName,
  createProduct,
  assignCategories,
  getPopularProducts,
  deleteCategories,
};
