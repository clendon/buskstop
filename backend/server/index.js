const express = require('express')
const mongo = require('mongodb');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('../database/user')


// create server
const app = express()

// configuration
const PORT = 3000

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true
})
);
app.use(cookieParser('secretCode'))
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
})
);
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


// path to database
const db = require('../database/db.js')

// connect to database
const m = new mongoose.Mongoose();
m.connect('mongodb+srv://Admin:admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
app.post('/login', (req, res) => {
  passport.authentication('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      req.login(user, err => {
        if (err) throw err;
        res.send('Successfully Authenticated');
        console.log(req.user);
      })
    };
  });
  (req, res, next);
});
app.post('/signup', (req, res) => {
  User.findOne({username: req.body.username}, async(err, doc) => {
    if (err) throw err;
    if (doc) res.send('User Already Exists');
    if (!doc) {
      const newUser = new User({
        username: erq.body.username,
        password: req.body.password
      })
      await newUser.save();
      res.send('User Created');
    }
  });
});

app.get('/user', (req, res) => {
  // store entire user
  res.send(req.user);
})
app.get('/people', (req, res) => {
  db.models.people.find()
  .exec()
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.post('/people', (req, res) => {
  res.sendStatus(201)
})

// starting the server
app.listen(PORT, () => {
  console.log(`Server is listening on Port:${PORT}`)
})