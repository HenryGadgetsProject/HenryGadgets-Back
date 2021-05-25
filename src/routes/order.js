const { Router } = require("express");
const {
  deleteOrder,
  addOrder,
  editOrder,
  allOrders,
  ordersAdmin,
  editOrderAdmin,
} = require("../controllers/order");

const router = Router();

router.delete("/user/:id", deleteOrder); //orders/user/id? borrar carrito u orden.
router.post("/orders/", addOrder); //orders/orders creacion del carrito.
router.put("/orders/:id", editOrder); //orders/orders/id? editar estado email y totalprice.
router.get("/users/orders", allOrders); //orders/users/orders buscar todas las ordenes de todos los usuarios que esten en el estado cart.
router.get("/admin", ordersAdmin) // orders/admin busca todas las ordenes de todos los estados.
router.put("/admin/:id/:state", editOrderAdmin) // orders/admin/:idorden edita el estado de una orden luego de revisar que todo este en orden.

module.exports = router;
