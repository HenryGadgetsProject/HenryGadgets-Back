const { Router } = require("express");
const router = Router();
const { User } = require('../../db');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env

router.get("/me", async (req, res, next) => {
    try {
      if (req.user) {
        const { id } = req.user;
        const result = await User.findByPk(id);
        res.json(result);
      } else res.sendStatus(401);
    } catch (error) {
      next(error);
    }
});
  
router.post("/login", function (req, res, next) {
    passport.authenticate(
        "local",
        { session: false },
        function (err, user, message) {
        if (err) return next(err);
        else if (!user) return res.sendStatus(401);
        else return res.send(jwt.sign(user, SECRET_KEY));
        }
    )(req, res, next);
});
  
router.get("/facebook", passport.authenticate("facebook"));  
  
router.get("/facebook/callback", passport.authenticate(("facebook"), {
    successRedirect: "https://henrygadgets.vercel.app/home",
    failureRedirect: "https://henrygadgets.vercel.app/home",
  }
));

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callback", passport.authenticate(("google"), {
    successRedirect: "https://henrygadgets.vercel.app/login",
    failureRedirect: "https://henrygadgets.vercel.app/home",
  }));

module.exports = router