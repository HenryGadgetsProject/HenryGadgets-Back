const nodemailer = require("nodemailer");
const SMTPConnection = require("nodemailer/lib/smtp-connection");
require("dotenv").config();
const { user, pass } = process.env;
const { Order, User, Wishlist } = require("../../db.js");

const emailBuyConfirmation = async (req, res) => {
  try {
      const { products, client, orderId } = req.body
      const data = await Order.findByPk(orderId)
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
      <h1>Hola ${client.first_name} ${client.last_name}!</h1>
      <p>Confirmación de pago ! ! !</p>
      </hr>
      <b>Tu pedido: #${data.id}</b>
      <b>Total: ${data.total_price}
      </hr>
      <p>Gracias por comprar en Henry Gadgets.</p>
      <p>Una vez que recibas tus productos podras dejar tu opionon sobre ellos.</p>
      <p>Te vamos a notificar una vez que los productos sean despachados a tu ubicacion.</p>
      <hr>
      <p>Datos de envio:<br>
      ${client.first_name} ${client.last_name}<br>
      ${data.street}<br>
      ${data.country}, ${data.city}<br>
      ${data.phone_number}</p><br>
      <b>Gracias por confiar en nosotros!</b>
      <div class="img-card">
      <img src="https://i.imgur.com/To3EW78.png" width="200px" height="200px" alt="apus" border="0"/>
      </div>
      </div>
      </body>
      </html>
      `;
  
    let mailOptions = {
      from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
      to: client.email,
      subject: `Confirmación de pago ! ! !`,
      html: htmlCreator,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.message);
  
      res.status(200).json({ answer: req.body });
    });
    } catch (error) {
      res.send(error)
    }
}

const emailThankYou = async (req, res) => {
  try {
      const { products, client } = req.body
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
      <h1>Gracias ${client.first_name} ${client.last_name} por comprar en Henry Gadgets!</h1>
      </hr>
      <div class="unorderlist">
        <ul>
          ${products.map((e) => 
            `<li>
              <span>${e.quantity} x ${e.name} por ${e.price}</span>
            </li>`)}
        </ul>
        <br>
      </div>
      <p>Total: ${data.total_price}</p>
      </hr>
      <p>Vamos a enviarte tu pedido una vez que confirmemos el pago, que puede demorar hasta 24hs.</p>
      <p>No te preocupes, te vamos a enviar un mensaje cuando esto suceda.</p>
      <b>Gracias por confiar en nosotros!</b>
      <div class="img-card">
      <img src="https://i.imgur.com/khqsGzc.png" width="200px" height="200px" alt="apus" border="0"/>
      </div>
      </div>
      </body>
      </html>
      `;
  
    let mailOptions = {
      from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
      to: client.email,
      subject: `Tu pedido fue recibido`,
      html: htmlCreator,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.message);
  
      res.status(200).json({ answer: req.body });
    });
    } catch (error) {
      res.send(error)
    }
}

// const passwordReset = async (req, res) => {
//   try {
//       const { email } = req.body
  
//       let transporter = nodemailer.createTransport({
//           service: "Gmail",
//           host: 'smtp.gmail.com',
//           post: 587,
//           secure: false,
//           auth: {
//               user: user,
//               pass: pass
//           },
//       });
  
//       let htmlCreator = `
//       <html>
//       <head>
//       <style type="text/css">
//       .containergral {
//           align-content: center;
//           justify-content: center;
//           padding: 30px;
//           position: relative;
//           background: #EFEFEF;
//           }
//       h1 {
//           color: #FF1744;
//       }
//       .unorderlist {
//           display: flex;
//           flex-direction: row;
//           align-items: center;
//           justify-content: center;
//           background: #F7F7F7;
//           color: #FF1744;
//         }
//       .img-card {
//           margin-left: 25%;
//           margin-top: 20px    
//       }
//       </style>
//       </head>
//       <body>
//       <div class="containergral">
//       <h1>Reset your password!</h1>
//       <p>Confirmación de orden ! ! !</p>
//       </hr>
//       <b>Tu lista de productos:</b>
//       <div class="unorderlist">
//         <ul>
//           ${products.map((e) => 
//             `<li>
//               <span>${e.quantity} x ${e.name} por ${e.price}</span>
//             </li>`)}
//         </ul>
//         <br>
//         <p>Total: ${data.total_price}</p>
//       </div>
//       </hr>
//       <p>Vamos a enviarte tu pedido una vez que confirmemos el pago, que puede demorar hasta 24hs.</p>
//       <p>No te preocupes, te vamos a enviar un mensaje cuando esto suceda.</p>
//       <p>Datos de envio:<br>
//       ${client.first_name} ${client.last_name}<br>
//       ${data.street}<br>
//       ${data.country}, ${data.city}<br>
//       ${data.phone_number}</p><br>
//       <b>Gracias por confiar en nosotros!</b>
//       <div class="img-card">
//       <img src="https://i.imgur.com/khqsGzc.png" width="200px" height="200px" alt="apus" border="0"/>
//       </div>
//       </div>
//       </body>
//       </html>
//       `;
  
//     let mailOptions = {
//       from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
//       to: client.email,
//       subject: `Has comprado ${product}`,
//       html: htmlCreator,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) return res.status(500).send(error.message);
  
//       res.status(200).json({ answer: req.body });
//     });
//     } catch (error) {
//       res.send(error)
//     }
// }

const sendOffersNotification = async (req, res) => {
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
  const users = await User.findAll();

  users.forEach(async (user) => {
    try {
      const wishlists = await Wishlist.findAll({
          where: {
              user_id: user.id
          }
      });
      if(wishlists) {
        if(user.nlsuscribe === true) {
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
          <body style="height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
              <div style="height: 100%; padding: 2rem; background-image: url('https://i.imgur.com/hRRqwnC.png'); background-size: 100%;">
                  <div style="border-radius: 2em;text-align: -webkit-center;background: rgba(0,0,0,.5);;z-index: 1;position: relative;color: #ffffff;padding: 1.6rem;">
                      <h1 font-size: 3rem;margin: 0;">Henry Gadgets!</h1>
                      <p style="color: #FF1744; font-size: 1.5rem;">Hola ${user.first_name}!</p>
                      <div style="margin: 1rem 0 1rem 0; background: #FF1744; padding: .3rem;border-radius: 20rem;">
                          <span style="font-size: 1.8rem;color: #ffffff;">Nuevos productos en oferta!</span>
                          <p style="font-size: 1.3rem;color: #ffffff;">Visita <a href="https://henrygadgets.vercel.app/">Henry Gadgets</a> para ver todas las ofertas...</p>
                      </div>
                  </div>
              </div>
          </body>
          </html>
          `

          let mailOptions = {
            from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
            to: user.email,
            subject: `Nuevos descuentos ${user.first_name}!!!`,
            html: htmlCreator,
          }; 

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).send(error.message);
    
            res.status(200).json({ answer: req.body });
          });
        }
      }
    } catch (error) {
        console.log(error)
    }
  })
}

const sendStockNotification = async (req, res) => {
  const { id } = req.params
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
  const users = await User.findAll();
  const product = await Product.findByPk(id);

  users.forEach(async (user) => {
    try {
      let wishlists = await Wishlist.findOne({
        where: {
          user_id: userId
        }, include: {
          model: Product,
          attributes: [
            'id',
            'name',
            'price',
            'description',
            'big_image',
            'rating',
            'stock',
          ]
        }
      })
      const productFound = wishlists.products.filter(prod => prod.id === id)
      if(productFound) {
        if(user.nlsuscribe === true) {
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
          <body style="height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
              <div style="height: 100%; padding: 2rem; background-image: url('https://i.imgur.com/hRRqwnC.png'); background-size: 100%;">
                  <div style="border-radius: 2em;text-align: -webkit-center;background: rgba(0,0,0,.5);;z-index: 1;position: relative;color: #ffffff;padding: 1.6rem;">
                      <h1 font-size: 3rem;margin: 0;">Henry Gadgets!</h1>
                      <p style="color: #FF1744; font-size: 1.5rem;">Hola ${user.first_name}!</p>
                      <div style="margin: 1rem 0 1rem 0; background: #FF1744; padding: .3rem;border-radius: 20rem;">
                          <span style="font-size: 1.8rem;color: #ffffff;">${product.name} en stock!</span>
                          <p style="font-size: 1.3rem;color: #ffffff;">Visita <a href="https://henrygadgets.vercel.app/">Henry Gadgets</a>...</p>
                      </div>
                  </div>
              </div>
          </body>
          </html>
          `

          let mailOptions = {
            from: "Henry Gadgets <henrygadgetsofficial@gmail.com>",
            to: user.email,
            subject: `${user.first_name} ${product.name} esta en stock!!!`,
            html: htmlCreator,
          }; 

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).send(error.message);
    
            res.status(200).json({ answer: req.body });
          });
        }
      }
    } catch (error) {
        console.log(error)
    }
  })
}

module.exports = { emailBuyConfirmation, emailThankYou, sendOffersNotification, sendStockNotification }