const { Router } = require("express");
const { User } = require("../models/User");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

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

router.post("/", async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      is_admin,
      email,
      password,
      // country,
      // city,
      // street,
      // addressnumber,
      // postcode,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !is_admin ||
      !email ||
      !password 
      // !country ||
      // !city ||
      // !street ||
      // !addressnumber ||
      // !postcode
    )
      res.send("Informacion enviada inválida");
    else {
      const userCreated = await createUser(
        id,
        first_name,
        last_name,
        is_admin,
        email,
        password,
        // country,
        // city,
        // street,
        // addressnumber,
        // postcode
      );
      if (typeof userCreated === "string")
        res.send("Este usuario ya existe en la base de datos");
      else res.send("Usuario creado con éxito");
    }
  } catch (error) {
    res.send(error, "!!!!!!!!!!!!!");
  }
});

router.put("/:id", async (req, res, next) => {
  const {
    first_name,
    last_name,
    is_admin,
    email,
    password,
    // country,
    // city,
    // street,
    // addressnumber,
    // postcode,
  } = req.body;

  const { id } = req.params;
  try {
    const updatedUser = await updateUser(
      id,
      first_name,
      last_name,
      is_admin,
      email,
      password,
      // country,
      // city,
      // street,
      // addressnumber,
      // postcode
    );
    return res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    if(!deletedUser){
      return res.status(400).send("El usuario que intenta eliminar, no existe")}
      else{
        return res.status(200).send("El usuario ha sido eliminado con exito");
      }
  } catch (error) {
    res.status(400).send("No se pudo borrar el usuario")
  }
})

module.exports = router;
