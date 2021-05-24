const { Router } = require("express");
const { promoteUser } = require("../controllers/user");
const isAuthorize = require("../middlewares/isAuthorize")
const router = Router();


router.post("/:id", async (req, res, next) => {
  console.log(req.body);
    const { is_admin }  = req.body
    const { id } = req.params;

    try {
      const userPromoted = await promoteUser(
        id, is_admin
      ); 
      res.send("Se realizo el cambio"); 
    } catch (error) {
      res.status(400).send(error, "Se ha producido un error");
    }
  });



module.exports = router;