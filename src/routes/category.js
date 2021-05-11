const { Router } = require("express");
const { Categories } = require('../models/Category')

const router = Router();

router.get('/', (req, res) => {
    res.send('category')
})

module.exports = router;