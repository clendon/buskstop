const User = require('../database/user');
const bcrypt = require('bcryptjs');
const  localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = ('../env/config')
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
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
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};