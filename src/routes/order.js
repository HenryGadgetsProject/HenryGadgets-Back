const { Router } = require("express");
const { Order } = require("../models/Order");
const {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  deleteAllOrders,
  deleteOneOrder,
  deleteUserOrders,
  updateOrder,
} = require("../controllers/order");

const router = Router();

//GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const result = await getAllOrders();
    if (result.length === 0) res.send("No hay ordenes generadas");
    else res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//GET ORDER BY IT'S ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderById(id);
    if (result === null) res.send("No existe alguna orden con esa ID");
    else res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//GET ORDER BY USER ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderByUserId(id);
    if (result.length === 0)
      res.send("Este usuario no tiene ordenes asociadas");
    else res.send(await result);
  } catch (error) {
    res.send(error);
  }
});

//CREATE AN ORDER
router.post("/", async (req, res) => {
  const { product_id, unit_price, quantity, userId } = req.body;
  if (!product_id || !unit_price || !quantity || !userId) {
    res.send("Complete todas las propiedades de la orden a actualizar");
  } else {
    try {
      const result = await addOrder(product_id, unit_price, quantity, userId);
      res.send("Orden generada");
    } catch (error) {
      res.send(error);
    }
  }
});

//DELETE ALL ORDERS
router.delete("/reset", async (req, res) => {
  try {
    await deleteAllOrders();
    res.send("Todas las ordenes han sido borradas");
  } catch (error) {
    res.send(error);
  }
});

//DELETE AN ORDER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await deleteOneOrder(id);
    if (result === 0) res.send("No existe alguna orden con esa ID");
    else if (result === 1) res.send("Orden borrada");
    else res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//DELETE ALL ORDERS OF AN USER
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await deleteUserOrders(id);
    if (result === 0) res.send("Este usuario no tiene ordenes asociadas");
    else res.send("Ordenes del usuario borradas");
  } catch (error) {
    res.send(error);
  }
});

//PUT AN ORDER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { product_id, unit_price, quantity, userId } = req.body;
  if (!product_id || !unit_price || !quantity || !userId) {
    console.log(product_id, unit_price, quantity, userId);
    res.send("Complete todas las propiedades de la orden a actualizar");
  } else {
    try {
      const result = await updateOrder(
        id,
        product_id,
        unit_price,
        quantity,
        userId
      );
      if (result[0] === 0) res.send("Esa ID de orden no existe");
      else if (result[0] === 1) res.send("Orden actualizada");
      else res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
});

module.exports = router;
