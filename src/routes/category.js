const { Router } = require("express");
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory } = require("../controllers/category");

const router = Router();

//GET ALL CATEGORIES
router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories()
        res.send(await categories)
    } catch (error) {
        res.send(error)
    }
})

//GET CATEGORY BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        res.send(await category)
    } catch (error) {
        res.send(error)
    }
})

//CREATE A NEW CATEGORY
router.post('/', async (req, res) => {
    try {
        const { id, name, photo, description } = req.body;
        if (!name || !photo) res.send('no hay nada')
        const category = await createCategory(id, name, photo, description);
        res.send(await category)
    } catch (error) {
        res.send(error)
    }
})

//UPDATE AN EXISTANT CATEGORY
router.put('/:id', async (req, res, next) => {

    const { name, photo } = req.body;
    const { id } = req.params;

    try {
        const updatedCategory = await updateCategory(id, name, photo)
        return res.send(updatedCategory)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//DELETE AN EXISTANT CATEGORY
router.delete('/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
        const deletedCategory = await deleteCategory(parseInt(id))
        return res.sendStatus(200)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
