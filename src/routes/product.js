const { Product, Category } = require("../../db.js");
const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  getProductsByName,
  createProduct,
  getPopularProducts,
  assignCategories,
  deleteCategories,
  updateProduct,
} = require("../controllers/product");
const {
  getReviews,
  createReview,
  editReview,
  deleteReview,
  getReviewsByUserId
} = require("../controllers/review");
const { v4: uuidv4 } = require("uuid");

const router = Router();


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const products = await getAllProducts();
      return res.json(await products);
    }
    const products = await getProductsByName(name);
    return res.json(await products);
  } catch (error) {
    return res.status(404).json({ message: "no products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.json(await product);
  } catch (error) {
    res.send(error);
  }
});

// CREATE A PRODUCT
router.post("/", async (req, res, next) => {
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

  if (!req.body) {
    res
      .status(400)
      .send("No hay información suficiente para crear su nuevo producto");
  }

  try {
    const createdProduct = await createProduct(
      id,
      name,
      price,
      rating,
      big_image,
      description,
      is_active,
      stock,
      categories
    );
    res.status(201).send(createdProduct);
  } catch (err) {
    res.send(error);
  }
});

// UPDATE A PRODUCT
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    price,
    stock,
    description,
    rating,
    is_active,
    big_image,
    categories
  } = req.body;

  try {
    const updatedProduct = await updateProduct(
      id,
      name,
      price,
      rating,
      big_image,
      description,
      is_active,
      stock,
      categories
    );
    return res.send(updatedProduct);
  } catch (error) {
    res.send(error);
  }
});

// REMOVE A PRODUCT
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

// GET POPULAR PRODUCTS
router.get("/popular/products", async (req, res) => {
  const popularProducts = await getPopularProducts();
  return res.json(await popularProducts);
});

// ASSIGN CATEGORIES TO PRODUCT
router.post("/:prodId/category/:catId", async (req, res) => {
  let { prodId, catId } = req.params;
  const assignCat = await assignCategories(prodId, catId);
  return res.send({ message: "Asigación completa!" });
});

// REMOVE CATEGORIES FROM PRODUCT
router.delete("/:prodId/category/:catId", async (req, res) => {
  let { prodId, catId } = req.params;
  const assignCat = await deleteCategories(prodId, catId);
  return res.send({ message: "Desasigación completa!" });
});


// ********************************************************
//                      Review
// ********************************************************

router.get('/:id/review', getReviews)

router.post('/:id/review', createReview)

router.put('/:id/review', editReview)

router.delete('/:id/review/:id', deleteReview)

router.get("/user/:userId", getReviewsByUserId);

module.exports = router;
