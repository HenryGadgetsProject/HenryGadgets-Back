const { Router } = require("express");
const {
  deleteOrder,
  addOrder,
  editOrder,
  allOrders,
} = require("../controllers/order");

const router = Router();

router.delete("/user/:id", deleteOrder);
router.post("/orders/", addOrder);
router.put("/orders/:id", editOrder);
router.get("/users/orders", allOrders);

module.exports = router;
