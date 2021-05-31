const { NewsletterOption, User } = require("../../db.js");
const enviarEmail = require("../email");
const { Router } = require("express");

const router = Router();
//Inicia el proceso de suscripción, por el momento no maneja token
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      email,
      boletinesInformativos,
      promociones,
      nuevosLanzamientos,
    } = req.body;

    const [newsLetter, created] = await NewsletterOption.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        email,
      },
    });
    if (created) {
      const url = `http://localhost:3001/newsLetter/suscripcion?id=${newsLetter.id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
      await enviarEmail.enviar({
        email,
        name,
        subject: "Suscripcion a Henry Gadgets!",
        url,
        archivo: "layout-suscription",
      });

      return res.json({
        message: `En tu bandeja de entrada te va a llegar la autorización para la suscripcion!
                Entra en tu bandeja y confirma para ver todos nuestras novedades!`,
      });
    } else {
      return res.json({
        message: "El email ya está en nuestra base de datos",
      });
    }
  } catch (error) {
    return res.json({
      newsLetter: {},
      message: error.message,
    });
    console.log(error.message);
  }
});

router.get("/suscripcion", async (req, res, next) => {
  console.log(req.query);
  try {
    const { id, boletinesInformativos, promociones, nuevosLanzamientos } =
      req.query;

    const newsLetter = await NewsletterOption.findOne({
      where: {
        id,
      },
    });
    console.log(newsLetter);
    if (newsLetter !== null) {
      await NewsletterOption.update(
        {
          active: true,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos,
        },
        {
          where: {
            id,
          },
        }
      );

      const html = `
                            <html>
                                <head>
                                    <title>Suscription</title>
                                </head>
                                <body>
                                <h3>${newsLetter.name} Te suscribiste con exito a nuestro Newsletter!</h3>
                                <a href="http://localhost:3000"> para terminar hace click aca</a>
                                </body>
                            </html>
                        `;

      res.send(html);
    } else {
      const html = `
                            <html>
                                <head>
                                    <title>Error</title>
                                </head>
                                <body>
                                Usuario no válido
                                </body>
                            </html>
                        `;

      res.send(html);
    }
  } catch (error) {
    const html = `
                        <html>
                            <head>
                                <title>Error</title>
                            </head>
                            <body>
                            ${Error}
                            </body>
                        </html>
                    `;

    res.send(html);
  }
});

router.get("/desuscribir", async (req, res, next) => {
  try {
    const { id, boletinesInformativos, promociones, nuevosLanzamientos } =
      req.query;

    const newsLetter = await NewsletterOption.findOne({
      where: {
        id,
      },
    });

    if (newsLetter !== null) {
      if (
        (boletinesInformativos === "false" &&
          promociones === "false" &&
          nuevosLanzamientos === "false") ||
        (boletinesInformativos === false &&
          promociones === false &&
          nuevosLanzamientos === false)
      ) {
        await NewsletterOption.update(
          {
            active: false,
            boletinesInformativos,
            promociones,
            nuevosLanzamientos,
          },
          {
            where: {
              id,
            },
          }
        );

        const html = `
                                <html>
                                    <head>
                                        <title>Desuscripción total</title>
                                    </head>
                                    <body>
                                    <a href="http://localhost:3000/home"> Vuela a Henry Gadgets </a>
                                    </body>
                                </html>
                            `;

        res.send(html);
      } else {
        await NewsletterOption.update(
          {
            boletinesInformativos,
            promociones,
            nuevosLanzamientos,
          },
          {
            where: {
              id,
            },
          }
        );

        const html = `
                                <html>
                                    <head>
                                        <title>Desuscripción parcial</title>
                                    </head>
                                    <body>
                                    <h3>${newsLetter.name} Tu suscripcion a nuestro Newsletter fue dada de baja! :(</h3>
                                    <a href="http://localhost:3000/home"> Vuela a Henry Gadgets</a>
                                    </body>
                                </html>
                            `;

        res.send(html);
      }
    } else {
      const html = `
                            <html>
                                <head>
                                    <title>Error</title>
                                </head>
                                <body>
                                Usuario no válido
                                </body>
                            </html>
                        `;

      res.send(html);
    }
  } catch (error) {
    return res.json({
      message: "Error " + error,
    });
  }
});

router.get("/correo-masivo-de-prueba", async (req, res, next) => {
  const boletinesInformativos = true;
  const promociones = true;
  const nuevosLanzamientos = true;

  try {
    const users = await User.findAll();

    for (let i = 0; i < users.length; i++) {
      const url = `http://localhost:3001/newsLetter/suscripcion?id=${users[i].id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
      //const urlBaja = `http://localhost:3001/newsLetter/desuscribir?id=${newsLetter.id}&boletinesInformativos=true&promociones=false&nuevosLanzamientos=false`;

      await enviarEmail.enviar({
        email: users[i].email,
        name: users[i].first_name,
        subject: "Suscripcion a Henry Gadgets!",
        url,
        archivo: "layout-suscription",
      });
    }

    return res.json({
      message: "Los correos han sido enviados",
    });
  } catch (error) {
    return res.json({
      message: "Error " + error,
    });
  }
});

module.exports = router;
