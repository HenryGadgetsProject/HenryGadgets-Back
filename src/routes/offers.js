const { Router } = require("express");
const { 
    setOffers,
    getOffers,
    deleteOffers
} = require("../controllers/offers");

const router = Router();

router.get('/', getOffers);
router.post('/', setOffers);
router.delete('/:id', deleteOffers);

module.exports = router