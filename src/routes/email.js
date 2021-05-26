const { Router } = require("express");
const bodyParser = require("body-parser");
const { emailBuyConfirmation } = require('../controllers/email');
const router = Router();

router.use(bodyParser.json());

router.post("/buy-confirmation", emailBuyConfirmation)

module.exports = router