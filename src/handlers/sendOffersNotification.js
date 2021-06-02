const enviarEmail = require('../email');
const { User, Wishlist } = require("../../db.js");
const wishlist = require('../data/wishlist');

const sendOffersNotification = async () => {
    const users = await User.findAll();

    users.forEach(user => {
        const wishlists = await Wishlist.findAll({
            where: {
                user_id: user.id
            }
        });
        if(wishlist) {
            if(user.nlsuscribe === true) {
                try {
                    await enviarEmail.enviar({
                        email: user.email,
                        name: user.first_name,
                        subject: `New discount are wating for you ${user.first_name}!!!`,
                        archivo: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Los productos que mas te gustan estan en oferta!!! </title>
                        </head>
                        <body style="height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
                            <div style="height: 100%; padding: 2rem; background-image: url('https://i.imgur.com/To3EW78.png'); background-size: 100%;">
                                <div style="border-radius: 2em;text-align: -webkit-center;background: rgba(0,0,0,.5);;z-index: 1;position: relative;color: #ffffff;padding: 1.6rem;">
                                    <h1 style="color: #6930C3; font-size: 3rem;margin: 0;">Henry Gadgets!</h1>
                                    <p style="color: #ffffff; font-size: 1.5rem;">Hi ${user.first_name}!</p>
                                    <div style="margin: 1rem 0 1rem 0; background: #6930C380; padding: .3rem;border-radius: 20rem;">
                                        <span style="font-size: 1.8rem;color: #ffffff;">Nuevos productos en oferta!</span>
                                        <p style="font-size: 1.3rem;color: #ffffff;">Visita nuestra pagina para ver todas las ofertas...</p>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        `
                    });
                    return true
                } catch (error) {
                    console.log(error)
                }
            }
        }
    })
}

module.exports = { sendOffersNotification }