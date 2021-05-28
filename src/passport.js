const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { AUTH_SECRET, FACEBOOK_CLIENT_SECRET, FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = process.env

passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password", session: false },
        async (email, password, done) => {
            const user = await User.findOne({
                where: { email: email } 
            });
            if (!user || !user.correctPassword(password)) return done(null, false);
            const { id, first_name, last_name, email: userEmail, is_admin, status } = user;
            return done(null, { id, first_name, last_name, email: userEmail, is_admin: is_admin, status: status });
        }
    )
);
  
passport.use(
    new BearerStrategy((token, done) => {
        jwt.verify(token, AUTH_SECRET, function (err, user) {
        if (err) return done(err);
        return done(null, user ? user : false);
        });
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(JSON.stringify(profile));
    const user = User.findOne({ where: { googleId: profile.id }})
    return cb(null, profile)
}));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
   function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
      const user = User.findOne({ where: { facebookUser: profile.id } });
      return cb(null, profile)
  }
));

module.exports = passport