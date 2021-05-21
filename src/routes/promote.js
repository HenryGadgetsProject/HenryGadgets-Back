const { Router } = require("express");
const {promoteUser} = require("../controllers/user");
const isAuthorize = require("../middlewares/isAuthorize")
const router = Router();


router.post("/:id", isAuthorize, async (req, res, next) => {
  
    const { id } = req.params;
    try {
      const userPromoted = await promoteUser(
        id
      );
      if (userPromoted[0] === 0) res.send("No se ha promocionado el usuario");
      else if (userPromoted[0] === 1)  res.send("Se promociono el usuario");
      else res.send(userPromoted);
    } catch (error) {
      res.status(400).send(error, "Se ha producido un error");
    }
  });


module.exports = router;