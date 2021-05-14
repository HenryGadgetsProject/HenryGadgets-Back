const { Router } = require("express");
const { User } = require('../models/User')
const { getAllUsers, getUserById, createUser } = require("../controllers/user");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userID = await getUserById(id);
        res.send(userID)
    } catch (error) {
        res.send(error)
    }
})

router.post("/", async (req, res) => {
    console.log(req.body);
  try {
    const {
        id,
      first_name,
      last_name,
      is_admin,
      email,
      password,
      country,
      city,
      street,
      addressnumber,
      postcode,
    } = req.body;
    if (
    !id ||
      !first_name ||
      !last_name ||
      !is_admin ||
      !email ||
      !password ||
      !country ||
      !city ||
      !street ||
      !addressnumber ||
      !postcode
    )
    res.send("usuario invalido");
    const userCreated = await createUser(
      id,
      first_name,
      last_name,
      is_admin,
      email,
      password,
      country,
      city,
      street,
      addressnumber,
      postcode
    );
    res.send(userCreated);
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;