const { Router } = require("express");
const {
  deleteOrder,
  addOrder,
  editOrder,
  allOrders,
} = require("../controllers/order");

const router = Router();

router.delete("/user/:id", deleteOrder); //orders/user/id? borrar carrito u orden
router.post("/orders/", addOrder); //orders/orders creacion del carrito 
router.put("/orders/:id", editOrder); //orders/orders/id? editar estado email y totalprice
router.get("/users/orders", allOrders); //orders/users/orders buscar todas las ordenes de todos los usuarios que esten en el estado cart

module.exports = router;
