const { Order, User, OrderDetail, Product } = require("../../db");

const allOrders = async (req, res) => {
  const data = await Order.findAll({where: {state: "cart"}});
  return res.json(data);
};

const orderById = async (req, res) => {
  const id = req.params.id
  const data = await Order.findByPk(id);
  return res.json(data)
}

const editOrder = async (req, res) => {
  try {
    const {
      state,
      total_price,
      country,
      street,
      city,
      phone_number,
    } = req.body;

    let order = await Order.findOne({
      where: {
        user_id: req.params.id,
        state: "cart",
      },
    });

    order.state = state;
    order.total_price = total_price;
    order.country = country;
    order.street = street;
    order.city = city;
    order.phone_number = phone_number
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
    country,
    street,
    city,
    phone_number
  } = req.body
  try {
    const user = await User.findOne({where:{email}})

    const orderCreate = await Order.findOrCreate({
      where: {
      state,
      total_price,
      country,
      street,
      city,
      phone_number,
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

const ordersAdmin = async (req, res) => {
  try {
      const data = await Order.findAll({
        attributes: ['id', 'state', 'total_price', 'created_at'],
        include: [{
            model: OrderDetail,
            attributes: ['id','quantity', 'unit_price'],
            include: [{
                model: Product,
                attributes: ['id', 'name', 'big_image', 'price'],
            }]
        },{
            model: User
        }]
      });
      return res.json(data);
  } catch (error) {
    res.send(error)
  }
}

const ordersByState = async (req, res) => {
  const state = req.params
  try {
    const data = await Order.findAll({
      where: {
        state: state.state
      },
      attributes: ['id', 'state', 'total_price', 'created_at'],
        include: [{
            model: OrderDetail,
            attributes: ['id','quantity', 'unit_price'],
            include: [{
                model: Product,
                attributes: ['id', 'name', 'big_image', 'price'],
            }]
        },{
            model: User,
            attributes: ['first_name', 'last_name']
          }
        ]
    });
    return res.json(data)
  } catch (error) {
    res.send(error)
  }
}

const editOrderAdmin = async (req, res) => {
  const { id, state } = req.params
  try {
    const newState = state
    const data = await Order.findByPk(id)
    data.state = newState
    await data.save()
    return res.json(data);
  } catch (error) {
    console.log(error)
  }
}

const discountStock = async (req, res) => {
  const { id } = req.params
  let productArray = []
  try{
      let productsFound = await OrderDetail.findAll({
          where: {
              order_id: id
          },
      })
      for (let i = 0; i < productsFound.length ;i++) {
        let product = await Product.findByPk(productsFound[i].dataValues.product_id)
        product.stock = product.stock - productsFound[i].dataValues.quantity
        await product.save()
        productArray.push(product)
      }
      return res.json(productArray)
  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  deleteOrder,
  addOrder,
  editOrder,
  allOrders,
  ordersAdmin,
  editOrderAdmin,
  ordersByState,
  orderById,
  discountStock,
};
