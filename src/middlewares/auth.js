const jwt = require('jsonwebtoken');
const authConfig = require('../auth')

module.exports = (req, res, next) => {
    //Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Unauthorized access" })
    } else {
        //Comprobar validez del token
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) {
                res.status(500).json({ msg: "Token not valid", err })
            } else {
                req.user = decoded
                next();
            }
        })
        next();
    }
};
