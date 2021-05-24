const { User } = require("../../db");
const bcrypt = require('bcrypt');
const auth = require("../auth");

const getAllUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        return error.message;
}
};

const createUser = async (id, first_name, last_name, email, password, is_admin, country, city, street, addressnumber, postcode) => {
    try {
      const user = await User.create({
        id,
        first_name,
        last_name,
        email,
        password,
        // is_admin,
        // country,
        // city,
        // street,
        // addressnumber,
        // postcode
      });
      return user;
    } catch (error) {
      return error.message;
    }
  };
  
  const updateUser = async (id, first_name, last_name,  email, password, is_admin, country, city, street, addressnumber, postcode) => {
    try {
      const userUpdated = await User.update(
        {
            first_name,
            last_name,
            email,
            password,
            is_admin,
            // country,
            // city,
            // street,
            // addressnumber,
            // postcode
        },
        { where: { id: id } }
      );
      return userUpdated;
    } catch (e) {
      return e.message;
    }
  };

  
  
  const deleteUser = async (id) => {
    try {
      let userDeleted = await User.destroy({ where: { id: id } });
      return userDeleted;
    } catch (e) {
      return e.message;
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
      console.log(userPromoted);
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

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    promoteUser,
    forcePassword
}