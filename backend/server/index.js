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

// commented out for now
// const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const User = require('../database/user');
const passportSetup = require('./passportConfig');

const database = require('../database/index');

// create server
const app = express();

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true,
}));
app.use(cookieParser('secretCode'));
// TODO: fix this, session is not defined and breaks the server trying to run the code
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

// path to database
// eslint-disable-next-line import/no-unresolved
const db = require('../database/index.js');

// connect to database
const m = new mongoose.Mongoose();
m.connect('mongodb+srv://Admin:Admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// routes
app.post('/login', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  passport.authentication('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      // eslint-disable-next-line no-shadow
      req.login(user, (err) => {
        if (err) throw err;
        res.send('Successfully Authenticated');
        // eslint-disable-next-line no-console
        console.log(req.user);
      });
    }
  });
  // eslint-disable-next-line no-unused-expressions
  (req, res);
});
app.post('/signup', (req, res) => {
  database.models.NewUser.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User Already Exists');
    if (!doc) {
      const newUser = new database.models.NewUser({
        username: req.body.username,
        password: req.body.password,
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
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/people', (req, res) => {
  database.models.people.find()
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('you have an err', err);
      res.end();
    });
});
app.post('/people', (req, res) => {
  res.sendStatus(201);
});

const PORT = 3000;

// starting the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on Port:${PORT}`);
});
