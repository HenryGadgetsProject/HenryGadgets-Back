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
  getReviewsByUserId,
  reviewAverage,
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
router.post("/", createProduct)

// UPDATE A PRODUCT
router.put("/:id", updateProduct);

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

router.get('/:id/review/rating', reviewAverage)

router.post('/:id/review', createReview)

router.put('/review/:id/', editReview)

router.delete('/review/:id', deleteReview)

router.get("/user/:userId", getReviewsByUserId);

module.exports = router;
