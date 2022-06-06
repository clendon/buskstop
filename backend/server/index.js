/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const passportLocal = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../../env/config');
const passportSetup = require('./passportConfig');
const database = require('../database/index');

// create server
const app = express();

// --------------MIDDLEWARE------------------------------------------
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true,
}));
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
// TODO: this passport file is broken, prevents server from running
// passport.use(new GoogleStrategy());
require('./passportConfig')(passport);

/**
 * // --------------ROUTES------------------------------------------
 *   1) GET Buskers
 *   2) GET Buskers - delinineated by category
 * Audience View
 *   3) GET Performers being followed by specfic user
 *   4) POST new follow on a Performer
 *   5) PATCH follower on a Performer
 * Performer View
 *   6) GET Followers by Busker
 *   7) GET thier own performances
 *   8) POST new performance
 *   9) PATCH - edit performance (params will include properties included within the events doc)
 *  10) DELETE a performance OR all performances
 * Mixed
 *  11) GET profile - Busker
 *  12) GET profile - audience member
 *  13) DELETE profile
 */

// 1)
app.get('/buskers', async (req, res) => {
  await database.findBuskers()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 2)
app.get('/buskers/:category', async ({ params }, res) => {
  const { category } = params;
  await database.findBuskerByCategory(category)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/buskers/:cash', async ({ params }, res) => {
  const { cash } = params;
  await database.findBuskerByCash(cash)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// --------------Audience View--------------------------------------
// 3)
app.get('/users/:name/following', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      res.send(results[0].Following);
    })
    .catch((err) => {
      res.send(err);
    });
});
// 4)
app.post('/users/:name/follow', async ({ params, user }, res) => {
  const { name } = params;
  await database.followPerformer(user, name)
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 5)
app.patch('/users/:name/unfollow', async ({ params, user }, res) => {
  const { name } = params;
  await database.unFollowerPerformer(user, name)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err);
    });
});
// --------------Performer View--------------------------------------

// 6)
app.get('/buskers/:name/followers', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      res.send(results[0].Followers);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 7)
app.get('/buskers/:name/events', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      res.send(results[0].Events);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 8)
app.post('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  const newEvent = {
    location: body.location,
    coordinates: body.coordinates,
    date: body.date,
  };
  await database.addEventFor(name, newEvent)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 9)
app.patch('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  await database.updateEventFor(name, body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 10)
app.delete('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  await database.deleteEventFor(name, body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// --------------Mixed--------------------------------------
// 11)
app.get('/profile/:name/busker', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      // NOTE: This result Object must be reconfigured to Handle profile properly.
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });

});

// 12)
app.get('profile/:name/audience', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      // NOTE: This result Object must be reconfigured to Handle profile properly.
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 13)
app.delete('/profile/:name', async ({ params }, res) => {
  const { name } = params;
  await database.deleteProfileFor(name)
    .then(() => {
      res.send(202);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// --------------AUTHENTICATION ROUTES--------------------------------------
app.post('/login', (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      // eslint-disable-next-line no-shadow
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Successfully Authenticated');
        // eslint-disable-next-line no-console
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post('/signup', ({ body }, res) => {
  const { username, password } = body;
  database.models.NewUser.findOne({ username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User Already Exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new database.models.NewUser({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('User Created');
    }
  });
});

app.get('/user', (req, res) => {
  // store entire user
  res.send(req.user);
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

app.get('/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  // console.log('req:::', req)
  // database.deleteGoogleId(req.sessionID)
  // console.log('lessgooooooo', req.sessionID)
  req.logout();
  res.redirect('/');
});

// app.get('/people', (req, res) => {
//   database.models.people.find()
//     .exec()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       console.log('you have an err', err);
//       res.end();
//     });
// });
// app.post('/people', (req, res) => {
//   res.sendStatus(201);
// });

const PORT = 3000;

// starting the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on Port:${PORT}`);
});
