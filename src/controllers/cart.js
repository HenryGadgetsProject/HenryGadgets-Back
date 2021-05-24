const { Order, OrderDetail, Product } = require("../../db");

const createGuestCart = async (req, res) => {
    const { user_id } = req.params
    try {
        const order = await Order.findOrCreate({
            where: {
                userId: user_id,
                state: "cart",
            },
        });

        for (let i = 0; i < req.body.length; i++) {
            let detailCreate = await OrderDetail.create({
                productId: req.body[i].id,
                quantity: req.body[i].quantity,
                unit_price: req.body[i].unit_price,
            });
            await detailCreate.setOrder(order[0].id)
        }
        res.json(req.body);
    } catch (error) {
        res.json(error);
    }
}

const addCart = async (req, res) => {
    const { user_id, id, quantity } = req.params;
    try {
        const order = await Order.findOrCreate({
            where: {
                userId: user_id,
                state: "cart",
            },
        });

        const product = await Product.findByPk(id);

        const findDuplicate = await OrderDetail.findAll({
            where: {
                productId: id,
                orderId: order[0].id,
            },
            include: [{ model: Product }]
        });
        if (findDuplicate.length !== 0) {
            res.send("Ya existe ese producto");
        } else {
            const detailCreate = await OrderDetail.create({
                productId: id,
                quantity: quantity,
                unit_price: product.price,
            });
            await detailCreate.setOrder(order[0].id);
            res.json(detailCreate);
        }
    } catch (error) {
        res.json(error);
    }
}

const getAllCarts = async (req, res) => {
    const { user_id } = req.params;

    try {
        const order = await Order.findOne({
            where: {
                userId: user_id,
                state: "cart",
            },

        });

        if (order) {
            const ordersDetail = await OrderDetail.findAll({
                where: {
                    orderId: order.id,
                },
                include: [{ model: Product }]
            });
            ordersDetail ? res.json(ordersDetail) : res.send("Card Empty");
        } else {
            res.json([]);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteAll = async (req, res) => {
    const { user_id } = req.params;

    try {
        const order = await Order.findOne({
            where: {
                userId: user_id,
                state: "cart",
            },
        });
        const orderDetails = await OrderDetail.findAll({
            where: {
                order_id: order.id,
            },
        });

        for (let i = 0; i < orderDetails.length; i++) {
            await orderDetails[i].destroy();
        }
        res.send({ msg: "All items have been deleted" });
    } catch (error) {
        console.log(error);
    }
}

const deleteCart = async (req, res) => {
    const { id, user_id } = req.params;

    try {
        const order = await Order.findOne({
            where: {
                userId: user_id,
                state: "cart",
            },
        });

        const orderDetail = await OrderDetail.findOne({
            where: {
                productId: id,
                orderId: order.id,
            },
        });
        orderDetail.destroy();
        //res.json(orderDetail);
        res.send({ msg: "Item succesfully deleted" })
    } catch (error) {
        console.log(error);
    }
}

const editCart = async (req, res) => {
    const { user_id, id, quantity } = req.params;
    console.log(quantity)
    try {
        const order = await Order.findOne({
            where: {
                userId: user_id,
                state: "cart",
            },
        });

        let orderDetail = await OrderDetail.findOne({
            where: {
                productId: id,
                orderId: order.id,
            },
        });

        orderDetail.quantity = quantity;
        await orderDetail.save();

        res.json(orderDetail);
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    addCart,
    getAllCarts,
    deleteAll,
    deleteCart,
    editCart,
    createGuestCart,
}