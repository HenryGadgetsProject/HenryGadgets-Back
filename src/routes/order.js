const { Router } = require("express");
const { Order } = require("../models/Order");
const {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
} = require("../controllers/order");

const router = Router();

//GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const result = await getAllOrders();
    res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//GET ORDER BY IT'S ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderById(id);
    res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//GET ORDER BY USER ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderByUserId(id);
    res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//CREATE AN ORDER
router.post("/", async (req, res) => {
  const { product_id, unit_price, quantity, userId } = req.body;
  try {
    const result = await addOrder(product_id, unit_price, quantity, userId);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
