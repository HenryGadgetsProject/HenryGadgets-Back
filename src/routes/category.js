const { Router } = require("express");
const { getAllCategories, getCategoryById, createCategory } = require("../controllers/category");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories()
        res.send(await categories)
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        res.send(await category)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, photo } = req.body;
        const category = await createCategory();
        res.send(await category)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
