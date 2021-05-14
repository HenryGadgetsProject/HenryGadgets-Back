const { Router } = require("express");
const { User } = require('../models/User')
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user");

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

router.put('/:id', async (req, res, next) => {

    const {
        first_name,
        last_name,
        is_admin,
        email,
        password,
        country,
        city,
        street,
        addressnumber,
        postcode} = req.body;

    const { id } = req.params;
    try {
        const updatedUser = await updateUser(id, first_name,
            last_name,
            is_admin,
            email,
            password,
            country,
            city,
            street,
            addressnumber,
            postcode)
        return res.send(updatedUser)
    } catch (error) {
      
        res.send(error)
    }

    
})

router.delete('/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
        const deletedUser = await deleteUser(parseInt(id))
        return res.sendStatus(200).send("Deleted user", deletedUser)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;