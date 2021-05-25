const { Router } = require("express");
const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  "TEST-1556627116850268-051917-4fa40347cb0e1197eb9f71d0d6a05a53-334254407"
);

const router = Router();
let HOST;
if (!process.env.DATABASE_URL) HOST = "http://localhost:3000";
else HOST = "https://henrygadgets.vercel.app";

//PROCESS PAYMENT
router.post("/", async (req, res) => {
  let { id } = req.params
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: req.body.price,
        quantity: req.body.quantity,
      },
    ],
    back_urls: {
      success: `${HOST}/success`,
      failure: `${HOST}/`,
      pending: `${HOST}/`,
    },
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({ url: response.body.init_point });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
