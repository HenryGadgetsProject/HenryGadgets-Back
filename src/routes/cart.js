const { Router } = require("express");
const { 
    addCart,
    getAllCarts,
    deleteAll,
    deleteCart,
    editCart 
} = require("../controllers/cart");

const router = Router();

router.delete("/:user_id/:id", deleteCart); // ok
router.post("/:user_id/:id", addCart); // ok
router.put("/:user_id/:id", editCart); // ok
router.get("/:user_id/cart", getAllCarts); // ok
router.delete("/:user_id/items/delete", deleteAll); // ok

module.exports = router;
