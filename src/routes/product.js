const { Product } = require('../models/Product')
const { Router } = require("express");
const { getAllProducts, getProductById, getProductsByName, createProduct, getPopularProducts } = require("../controllers/product");
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            const products = await getAllProducts();
            return res.json(await products);
        }
        const products = await getProductsByName(name);
        return res.json(await products);


    } catch (error) {
        return res.status(404).json({ message: 'no products' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.json(await product)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res, next) => {

    const id = uuidv4()

    const productInfo = req.body

    if(!productInfo) {
        res.status(400).send('No hay información suficiente para crear su nuevo producto')
    }

    try {
        const createdProduct = await createProduct(productInfo, id, next)
        res.status(201).send(createdProduct)
    } catch (err) {
        next(err)
    }
})

router.get('/popular/products', async (req, res) => {
    const popularProducts = await getPopularProducts();
    return res.json(await popularProducts);
})


module.exports = router;
