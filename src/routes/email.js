const { Router } = require("express");
const bodyParser = require("body-parser");
const { emailBuyConfirmation, emailThankYou, sendStockNotification } = require('../controllers/email');
const router = Router();

router.use(bodyParser.json());

router.post("/buy-confirmation", emailBuyConfirmation);
router.post("/buy-thanks", emailThankYou);
//router.post("/passwordReset", passwordReset);
router.post("/stock/:id", sendStockNotification);

module.exports = router