const { Category, Product, Offer } = require("../../db");
const sendOffersNotification = require('../handlers/sendOffersNotification');

const setOffers = async (req, res) => {
    let { target, targetId, discount, duration } = req.body
    duration = duration * 60 * 60 * 1000;
    discount = (discount / 100);
    let productsToUpdate = [];

    switch (target) {
        case "category":
            let prod = await Product.findAll({
                include: {
                    model: Category,
                    where: {
                        id: targetId
                    }
                }
            });
            prod.forEach(element => {
                productsToUpdate.push(element.id);
            });
            break;

        case "product":
            productsToUpdate.push(targetId);
            break;

        default:
            return "please check the target field"
    }

    let update = defineOffert(discount, productsToUpdate, 0);

    let offert = await Offer.create({
        targetm,
        targetId,
        discount,
        duration,
        active: true
    });

    console.log('offer', offert.id)

    let restore = setTimeout(defineOffert, duration, 0, productsToUpdate, offert.id)

    sendOffersNotification()
    return "todo OK"
}

const defineOffert = async () => {
    let update = await Product.update({
        discount
    },
    {where: {
        id: productsToUpdate
    }})

    if(offertId !== 0) {
        await Offer.update({
            active: false 
        },{
            where: {
                id: offertId,
            }
        });
        console.log(`offert #${offertId} has finished`)
    }

    return res.json(update)
}

const getOffers = async (req, res) => {
    const { active } = req.params
    try {
        if(active) {
            offerts = await Offer.findall({
                where: {active,
                }
            });
        } else {
            offerts = await Offer.findAll({});
        }
        return res.json(offerts);
    } catch (error) {
        res.send(error)
    }
}

module.exports = { setOffers, getOffers }