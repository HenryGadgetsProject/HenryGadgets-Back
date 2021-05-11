const { Router } = require("express");
const { Review } = require('../models/Review')

const router = Router();

router.get('/', (req, res) => {
    res.send('review')
})

module.exports = router;