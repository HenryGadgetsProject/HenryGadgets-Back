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
  try {
    await Order.destroy({
      where: {},
    });
  } catch (error) {
    return error.message;
  }
};

const deleteOneOrder = async (id) => {
  try {
    let result = await Order.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    return error.message;
  }
};

const deleteUserOrders = async (userId) => {
  try {
    let result = await Order.destroy({
      where: { userId },
    });
    return result
  } catch (error) {
    return error.message;
  }
};

const updateOrder = async (id, product_id, unit_price, quantity, userId) => {
  try {
    const result = await Order.update(
      { product_id, unit_price, quantity, userId },
      { where: { id } }
    );
    return result;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  addOrder,
  deleteAllOrders,
  deleteOneOrder,
  deleteUserOrders,
  updateOrder,
};
