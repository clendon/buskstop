const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
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
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    database.models.newUser.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
