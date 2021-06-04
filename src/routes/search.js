const { Router } = require('express')
const { searchProducts } = require('../controllers/search')

const router = Router();

router.get('/', async (req, res) => {
    const { query } = req.query
    if (query) {
        try {
            const result = await searchProducts(query)
            if (!result) {
                res.status(400).send(`No se ha encontrado nada`)
            }
            res.send(result)
            return
        } catch (error) {
            console.log(error);
            // next(error);
        }
    }
})

module.exports = router;
