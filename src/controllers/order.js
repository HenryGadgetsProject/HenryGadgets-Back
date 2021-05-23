const { Order, User, OrderDetail } = require("../../db");

const allOrders = async (req, res) => {
  const data = await Order.findAll({where: {state: "cart"}});
  return res.json(data);
};

const editOrder = async (req, res) => {
  try {
    const {
      state,
      total_price,
      email
    } = req.body;

    let order = await Order.findOne({
      where: {
        user_id: req.params.id,
        state: "cart",
      },
    });

    order.state = state;
    order.totalPrice = total_price;
    await order.save();

    res.send(order);
  } catch (error) {
    console.log("error", error);
    res.json(error.error);
  }
}

const addOrder = async (req, res) => {
  const {
    state,
    total_price,
    email
  } = req.body
  try {
    const user = await User.findOne({where:{email}})

    const orderCreate = await Order.findOrCreate({
      where: {
      state,
      total_price,
      email
    },
  })

  res.send(orderCreate).status(200);

  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        id: id,
      },
    });
    res.json(order);
    order.destroy();
  } catch (error) {
    console.log(error);
  }
};

const ordersAdmin = async () => {
  const data = await Order.findAll({
    attributes: ['id', 'state','created_at', 'updated_at', 'total_price'],
    include: [{
        model: OrderDetail,
        attributes: ['id','quantity', 'unit_price'],
        include: [{
            model: Product,
            attributes: ['id', 'name', 'big_image', 'unit_price'],
        }]
    },{
        model: User,
        attributes: ['first_name', 'last_name']
    }]
  });
  return res.json(data);
}

const editOrderAdmin = async () => {
  const id = req.params.id
  const newState = req.query.state
  const data = await Order.findByPk(id)
  data.state = newState
  await data.save()
  return res.json(data);
}

module.exports = {
  deleteOrder,
  addOrder,
  editOrder,
  allOrders,
  ordersAdmin,
  editOrderAdmin,
};
