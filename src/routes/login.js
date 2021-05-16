const { Router } = require("express");
// const { signIn } = require("../controllers/authentication");
const { User } = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

const router = Router();

router.post('/', (req, res) => {
    let { email, password } = req.body

    //Buscar usuario
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if(!user) {
            res.status(404).json({ msg: "User not found!" })
        } else {
            if (bcrypt.compareSync(password, user.password)){
                //Devolvemos token
                let token = jwt.sign({ user }, authConfig.secret, { expiresIn: authConfig.expires})
                res.json({
                    user,
                    token
                })
            } else {
                res.status(401).json({ msg: "Password is incorrect!" })
            }
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;
