
const bcrypt = require('bcrypt');
const auth = require("../auth");
const { User, Order, OrderDetail, Product } = require("../../db");

const getAllUsers = async () => {
  try {
      return await User.findAll();
  } catch (error) {
      return error.message;
  }
};

const createUser = async (id, first_name, last_name, email, password) => {
  try {
    const user = await User.create({
      id,
      first_name,
      last_name,
      email,
      password,
    });
    return user;
  } catch (error) {
    return error.message;
  }
};
  
const updateUser = async (id, first_name, last_name,  email, password, is_admin, status) => {
  try {
    const userUpdated = await User.update(
      {
          first_name,
          last_name,
          email,
          password,
          is_admin,
          status,
      },
      { where: { id: id } }
    );
    return userUpdated;
  } catch (e) {
    return e.message;
  }
};

const changeUserStatus = async (req, res) => {
  const { id, status } = req.params;
  const user = await User.findOne({ where: { id: id }});
  
  if (user) {
    if (status === "active" || "disabled" || "banned") {
      await user.update({ status: status });
      res.status(200);
    } else {
      return res.json({error: "does not have a valid option"})
    }
    return res.json(user);
  } else {
    res.status(400);
    return res.json({ error: "that user cannot be find" });
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    return error.message;
  }
};

const promoteUser = async (id, is_admin) => {
  try {
    const userPromoted = await User.update(   
      {
          is_admin : !is_admin
      },
      { where: { id: id } }
      
    );
    return userPromoted;
  } catch (e) {
    return e.message;
  }
};

const forcePassword = async (id, newPassword) => {
  try {
    const hashPassword = bcrypt.hashSync(newPassword,parseInt(auth.rounds))
    const forcedPassword = await User.update(   
      {
          password : hashPassword
      },
      { where: { id: id } }
      
    );
    return forcedPassword;
  } catch (e) {
    return e.message;
  }
};

const getOrderHistory = async () => {
  let id = req.params.id; 
  try{
      let data = await User.findOne({ 
          where: { 
              id: id 
          },
      include:[{
          model: Order,
          attributes: ['id', 'state','created_at', 'updated_at', 'total_price'],
          include: [{
              model: OrderDetail,
              attributes: ['id','quantity', 'unit_price'],
              include: [{
                  model: Product,
                  attributes: ['id', 'name', 'big_image', 'price'],
              }]
          }]
      }]})
      return res.json(data.orders);
  } catch (err) {        
      return res.json(err);
  }    
}

module.exports = {
    getAllUsers,
    createUser,
    changeUserStatus,
    updateUser,
    getUserById,
    promoteUser,
    forcePassword,
    getOrderHistory,
}