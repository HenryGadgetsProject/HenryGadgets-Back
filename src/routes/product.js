const { Router } = require("express");
const { Product } = require('../models/Product')

const router = Router();

router.get('/', (req, res) => {
    res.send('product')
})

module.exports = router;