const { Router } = require("express");
const { 
    setOffers
} = require("../controllers/offers");

const router = Router();

router.post('/', setOffers);

module.exports = router