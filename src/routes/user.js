const { Router } = require("express");
const { User } = require('../models/User')

const router = Router();

router.get('/', (req, res) => {
    res.send('user')
})

module.exports = router;