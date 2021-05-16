const { Order, User } = require("../../db");

const getAllOrders = async () => {
  try {
    return await Order.findAll();
  } catch (error) {
    return error.message;
  }
};

const getOrderById = async (id) => {
  try {
    return await Order.findOne({ where: { id } });
  } catch (error) {
    return error.message;
  }
};

const getOrderByUserId = async (userId) => {
  try {
    return await Order.findAll({ where: { userId } });
  } catch (error) {
    return error.message;
  }
};

const addOrder = async (product_id, unit_price, quantity, userId) => {
  try {
    const newItem = await Order.create({
      product_id,
      unit_price,
      quantity,
      userId,
    });
    return newItem;
  } catch (error) {
    return error.message;
  }
};

const deleteAllOrders = async () => {
  try{

  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  deleteAllOrders,
};
