const { Router } = require("express");
const { User } = require("../../db");
const jwt = require("jsonwebtoken");

const { getUserById } = require('../controllers/user')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            var { user: { id }} = req.user;
            const result = await getUserById(id);            
            var { id, first_name, last_name, email, is_admin } = result
            res.json({id, first_name, last_name, email, is_admin}); // envio el obj sin el pass
        } else res.send("entra aca");
      } catch (error) {
        next(error);
      }
})

module.exports = router