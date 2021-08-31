/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../../env/config');
const database = require('../database/index');

// eslint-disable-next-line func-names
module.exports = function (passport) {
  passport.use(
    // eslint-disable-next-line new-cap
    new localStrategy((username, password, done) => {
      // eslint-disable-next-line consistent-return
      database.models.NewUser.findOne({ username }, (err, user) => {
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
  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect',
  },
  ((request, accessToken, refreshToken, profile, done) => {
    const authID = `google:${profile.id}`;
    database.models.NewUser.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // user already exists
        console.log(`user already exists:${currentUser}`);
      } else {
        // create user in db
        new database.models.NewUser({
          username: profile.displayName,
          googleId: profile.id,
        }).save().then((newUser) => {
          console.log(` user created:${newUser}`);
        });
      }
    });
    // cb(null, profile);
  })));
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    database.models.NewUser.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
