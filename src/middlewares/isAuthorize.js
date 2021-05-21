const jwt = require('jsonwebtoken');
const authConfig = require('../auth')

const isAuthorize = async (req, res, next) => {
        if(!req.user.user.is_admin) {

            res.status(401).json({ msg: "Unauthorized access" })
        } else {
                next()
        }
};

module.exports = isAuthorize;