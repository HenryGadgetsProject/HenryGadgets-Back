const { Router } = require("express");
const { User } = require("../models/User");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const isAuthorize = require("../middlewares/isAuthorize")
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", isAuthorize, async (req, res) => {
  try {
    const { id } = req.params;
    const userID = await getUserById(id);
    res.send(userID);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", isAuthorize, async (req, res) => {
  try {
    const {
      id,
      first_name,
      last_name,
      email,
      password,
      // is_admin,

    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password 
       // !is_admin ||

    )
      res.send("Informacion enviada inválida");
    else {
      const userCreated = await createUser(
        id,
        first_name,
        last_name,
        email,
        password,
        //  is_admin,
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
    // country,
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
      // country,
    );
    if (updatedUser[0] === 0) res.send("No se ha actualizado el usuario");
    else if (updatedUser[0] === 1)  res.send("Se actualizo el usuario");
    else res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error, "Se ha producido un error");
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);

    if(!deletedUser){
      return res.status(400).send("El usuario que intenta eliminar, no existe")}
      else{
        return res.status(201).send("El usuario ha sido eliminado con exito");
      }
  } catch (error) {
    res.status(400).send("No se pudo borrar el usuario")
  }
})

module.exports = router;
