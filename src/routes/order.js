const { Router } = require("express");
const { Order } = require('../models/Order')

const router = Router();

router.get('/', (req, res) => {
    res.send('order')
})

module.exports = router;