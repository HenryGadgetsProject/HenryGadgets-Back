const jwt = require('jsonwebtoken');
const authConfig = require('../auth')

const Authentication = async (req, res, next) => {
    if(req.url === '/login' || req.url === '/register'){
        next()
    }else{
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
        }
    }
    //Comprobar que existe el token
 
};

module.exports = Authentication;