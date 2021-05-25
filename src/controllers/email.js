const nodemailer = require("nodemailer");
const SMTPConnection = require("nodemailer/lib/smtp-connection");
require("dotenv").config();
const { user, pass } = process.env;

const emailBuyConfirmation = async (req, res) => {
    const { products, client, orderId } = req.body
    console.log(products)
    let product
    if(!products) return res.status(500).json({ error: "product missing" })
    if(!Array.isArray(products)) return res.status(500).json({ error: "products should be and array" });
    if(!client.first_name || !client.last_name) return res.status(500).json({ error: "Client first name or last name missing"})
    if(!client.email) return res.status(500).json({ error: "User mail missing"})

    if(products.length === 1) product = `${products[0].name}!`
    if(products.length === 2) product = `${products[0].name} y ${products[1].name}!`
    if(products.length > 2) product = `${products[0].name}, ${products[1].name} y mas !`

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        post: 587,
        secure: false,
        auth: {
            user: user,
            pass: pass
        },
    });

    let htmlCreator = `
    <html>
    <head>
    <style type="text/css">
    .containergral {
        align-content: center;
        justify-content: center;
        padding: 30px;
        position: relative;
        background: #EFEFEF;
        }
    h1 {
        color: #FF1744;
    }
    .unorderlist {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #F7F7F7;
        color: #FF1744;
      }
    .img-card {
        margin-left: 25%;
        margin-top: 20px    
    }
    </style>
    </head>
    <body>
    <div class="containergral">
    <h1>Hola ${client.first_name} ${client.last_name}!, confirmamos la compra de su producto</h1>
    <p>Confirmación de compra de su producto ! ! !</p>
    </hr>
    <b>Tu lista de productos:</b>
    <div class="unorderlist">
    <ul>
    ${products.map((e) => `<p>${e.name}</p>`)}
    </ul>
    </div>
    </hr>
    <b>Gracias por confiar en nosotros!</b>
    <div class="img-card">
    <img src="https://i.imgur.com/To3EW78.png" alt="apus" border="0"/>
    </div>
    </div>
    </body>
    </html>
    `;

  let mailOptions = {
    from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
    to: client.email,
    subject: `Has comprado ${product}`,
    html: htmlCreator,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.message);

    res.status(200).json({ answer: req.body });
  });
}

module.exports = {emailBuyConfirmation}