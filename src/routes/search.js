const { Router } = require('express')
const { searchProducts } = require('../controllers/search')

const router = Router();

router.get('/', async (req, res) => {
    // console.log('entre a la ruta')
    const { query } = req.query

    console.log(query)
    // const result = await searchProducts(queryByName)

    // res.send(result)

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

// router.get('/', async (req, res) => {
//     try {
//         const categories = await getAllCategories()
//         res.send(await categories)
//     } catch (error) {
//         res.send(error)
//     }
// })

module.exports = router;
