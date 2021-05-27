const { Router } = require("express");
const { forcePassword } = require("../controllers/user");

const bcrypt = require('bcrypt');
const auth = require("../auth");
// const isAuthorize = require("../middlewares/isAuthorize")
const router = Router();

router.post("/:id",  async (req, res, next) => {
    const { id } = req.params;
    const password = req.body.password || process.env.FORCE_PASSWORD 
    //const hashPassword = bcrypt.hashSync(password,parseInt(auth.rounds))
 
    try {
      const forcedPassword = await forcePassword(id, password); 
      if( forcedPassword[0] === 1 ){ return res.status(200).send("Se realizo con el exito el reset del password"); }
      res.send('No se realizo el reset de password')
    } catch (error) {
      res.status(400).send("Se ha producido un error");
    }

  });

module.exports = router;