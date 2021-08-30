const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = ('../env/config')
const database = require('../database/index');

// eslint-disable-next-line func-names
module.exports = function (passport) {
  passport.use(
    // eslint-disable-next-line new-cap
    new localStrategy((username, password, done) => {
      // eslint-disable-next-line consistent-return
      database.models.newUser.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        // eslint-disable-next-line no-shadow
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );
  passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/user'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({googleId: profile.id}).then((currentUser)=>{
          if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else{
               //if not, create a new user
              new User({
                googleId: profile.id,
              }).save().then((newUser) =>{
                done(null, newUser);
              });
           }
        })
      })
  );
  passport.deserializeUser((id, cb) => {
    database.models.newUser.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
