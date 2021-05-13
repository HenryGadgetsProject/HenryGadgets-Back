const { Router } = require("express");
const { searchProducts } = require('../controllers/search')

const router = Router();

router.get('/search', async (req, res) => {



    console.log('entre a la ruta')
    const { query } = req.query

    console.log(query)
    const result = await searchProducts(query)

    res.send(result)
})

module.exports = router;