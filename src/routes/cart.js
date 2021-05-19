const { Router } = require("express");
const { 
    addCart,
    getAllCarts,
    deleteAll,
    deleteCart,
    editCart 
} = require("../controllers/cart");

const router = Router();

router.delete("/:user_id/:id", deleteCart); // ok /cart/userid?/idproducto borrar producto del carrito
router.post("/:user_id/:id", addCart); // ok /cart/userid?/idproducto agregar producto al carrito, se crea carrito orden
router.put("/:user_id/:id", editCart); // ok /cart/userid?/idproducto editar cantidad de un producto uid y pid params quantity body
router.get("/:user_id/cart", getAllCarts); // ok /cart/userid?/cart buscar todas los carritos
router.delete("/:user_id/items/delete", deleteAll); // ok /cart/userid?/items/delete borra todos los productos del carrito

module.exports = router;
