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

  module.exports = { forcePassword }