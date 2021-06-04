const { Router } = require("express");
const { User } = require("../models/User");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserStatus,
  getOrderHistory,
  editSuscribe,
} = require("../controllers/user");
const { 
  getWishlist,
  deleteWishlist,
  addProduct,
  deleteItem,
} = require("../controllers/wishlist");
const isAuthorize = require("../middlewares/isAuthorize");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userID = await getUserById(id);
    res.send(userID);
  } catch (error) {
    res.send(error);
  }
});

router.get(":id/orders", getOrderHistory)


router.post("/", async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      password,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password 
    )
      res.send("Informacion enviada inválida");
    else {
      const userCreated = await createUser(
        id,
        first_name,
        last_name,
        email,
        password,
      );
      if (typeof userCreated === "string"){
        res.status(400).send("Este usuario ya existe en la base de datos");
      } else {
        res.status(201).send("Usuario creado con éxito");
      }
      
    }
  } catch (error) {
    res.status(400).send(error, "Se ha producido un error");
  }
});

router.put("/:id", async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    is_admin,
  } = req.body;

  const { id } = req.params;
  try {
    const updatedUser = await updateUser(
      id,
      first_name,
      last_name,
      email,
      password,
      is_admin,
    );
    if (updatedUser[0] === 0) res.send("No se ha actualizado el usuario");
    else if (updatedUser[0] === 1)  res.send("Se actualizo el usuario");
    else res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error, "Se ha producido un error");
  }
});

router.put("/:id/:status", changeUserStatus);
router.put("/suscribe/nletter/:id", editSuscribe);

router.get("/wishlist/:userId", getWishlist);
router.post("/wishlist/:userId/:prodId", addProduct);
router.delete("/wishlist/:userId", deleteWishlist);
router.delete("/wishlist/:userId/:prodId",deleteItem);

module.exports = router;
