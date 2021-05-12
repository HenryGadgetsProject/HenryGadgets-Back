
const { Product } = require('../models/Product')

const { Router } = require("express");
const uuid = require('uuid');
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

router.post('/', async (req, res) => {
    try {
        const id = uuidv4();
        const { name, price, stock, description, rating, is_active, big_image, categories } = req.body;
        if (!name || !price || !stock || !description || !rating || !is_active || !big_image) {
            return res.status(400).json({ message: 'all the parametters are require' })
        }


        const product = await createProduct(name.toLowerCase(), name, price, stock, description, rating, is_active, big_image, categories)
        return res.status(201).json(await product)
    } catch (e) {
        return res.status(400).json({ message: e })
    }
})

router.get('/popular/products', async (req, res) => {
    const popularProducts = await getPopularProducts();
    return res.json(await popularProducts);
})


module.exports = router;
