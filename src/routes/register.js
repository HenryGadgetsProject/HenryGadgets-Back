const { Router } = require("express");
const { signUp } = require("../controllers/authentication");
const { User } = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

const router = Router();

router.post('/', (req, res) => {
    //Crear usuario
    const { id, first_name, last_name, email, password, country, city, street, addressnumber, postcode, is_admin } = req.body;
    //Encriptamos la pass
    let passwordHash = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
    User.create({ 
        id, first_name, last_name, email, password: passwordHash, country, city, street, addressnumber,postcode, is_admin 
    }).then(user => {
        let token = jwt.sign({ user: user }, authConfig.secret, { 
            expiresIn: authConfig.expires 
        });
        res.json({ 
            user, 
            token 
        });
    }).catch(err => {
        res.status(500).json(err);
    });
})

module.exports = router;