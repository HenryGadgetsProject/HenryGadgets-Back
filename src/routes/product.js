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
  getProductsByCatName
} = require("../controllers/product");
const { v4: uuidv4 } = require("uuid");

const router = Router();

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

// ********************************************************
//                      Categories
// ********************************************************

router.post("/category", async (req, res) => {
  try {
    const { name, photo, description } = req.body;
    if (!name || !photo || !description) res.send("no hay nada");
    const category = await createCategory(name, photo, description);
    res.send(await category);
  } catch (error) {
    res.send(error);
  }
});

router.put("/category/:id", async (req, res, next) => {
  const { name, photo, description } = req.body;
  const { id } = req.params;

  try {
    const updatedCategory = await updateCategory(id, name, photo, description);
    return res.send(updatedCategory);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/category/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCategory = await deleteCategory(parseInt(id));
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

// *******

router.get("/categories/:catName", async (req, res) => {
  const { catName } = req.params;

  try {
    const productsByCatName = await getProductsByCatName(catName);

    return res.send(productsByCatName);
  } catch (error) {
    res.send(error);
  }
});

// *******

router.get("/popular/products", async (req, res) => {
  const popularProducts = await getPopularProducts();
  return res.json(await popularProducts);
});

router.post("/:prodId/category/:catId", async (req, res) => {
  let { prodId, catId } = req.params;
  const assignCat = await assignCategories(prodId, catId);
  return res.send({ message: "Asigación completa!" });
});

router.delete("/:prodId/category/:catId", async (req, res) => {
  let { prodId, catId } = req.params;
  const assignCat = await deleteCategories(prodId, catId);
  return res.send({ message: "Desasigación completa!" });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
