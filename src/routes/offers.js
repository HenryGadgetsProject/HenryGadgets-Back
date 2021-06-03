const { Router } = require("express");
const { 
    setOffers,
    getOffers
} = require("../controllers/offers");

const router = Router();

router.get('/', getOffers)
router.post('/', setOffers);

module.exports = router