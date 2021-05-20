const { Router } = require("express");
const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const authConfig = require('../auth');
const { getUserById } = require('../controllers/user')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const { id } = req.user;
            const result = await getUserById(id);
            res.json(result);
        } else res.sendStatus(401);
      } catch (error) {
        next(error);
      }
})

module.exports = router