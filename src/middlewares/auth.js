const jwt = require("jsonwebtoken");
const authConfig = require("../auth");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, authConfig.secret);
      
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

// const Authentication = async (req, res, next) => {
  
//   if (req.url === "/login" || req.url === "/register" || req.method === "GET" 
//   || req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
 
//     if (req.headers.authorization) {
//       //Comprobar validez del token
//       let token = req.headers.authorization.split(" ")[1];

//       jwt.verify(token, authConfig.secret, (err, decoded) => {
//         if (err) {
//           res.status(500).json({ msg: "Token not valid", err });
//         } else {
//           req.user = decoded;
//           next();
//         }
//       });
//     } else {
//       next();
//     }
//   } else {
//     if (!req.headers.authorization) {
//       res.status(401).json({ msg: "Unauthorized access" });
//     } else {
//       let token = req.headers.authorization.split(" ")[1];

//       jwt.verify(token, authConfig.secret, (err, decoded) => {
//         if (err) {
//           res.status(500).json({ msg: "Token not valid", err });
//         } else {
//           req.user = decoded;
//           next();
//         }
//       });
//     }
//   }
// };

module.exports = auth;
