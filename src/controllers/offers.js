const { Category, Product, Offer } = require("../../db");
const {sendOffersNotification} = require('./email');

const setOffers = async (req, res) => {
    let { target, targetName, discount, duration } = req.body
    duration = duration * 60 * 60 * 1000;
    discount = (discount / 100);
    let productsToUpdate = [];

    switch (target) {
        case "category":
            let prod = await Product.findAll({
                include: {
                    model: Category,
                    where: {
                        name: targetName
                    }
                }
            });
            prod.forEach(element => {
                productsToUpdate.push(element.name);
            });
            break;

        case "product":
            productsToUpdate.push(targetName);
            break;

        default:    
            return "please check the target field"
    }

    let update = defineOffert(discount, productsToUpdate, 0);

    let offert = await Offer.create({
        target,
        targetName,
        discount,
        duration,
        active: true
    });

    console.log('offer', offert.id)

    let restore = setTimeout(defineOffert, duration, 0, productsToUpdate, offert.id)

    sendOffersNotification()
    res.send({ message: "OK" })
}

const defineOffert = async (discount, productsToUpdate, offertId) => {
    let update = await Product.update({
        discount
    },
    {where: {
        name: productsToUpdate
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

    return update
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