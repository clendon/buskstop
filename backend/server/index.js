const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes to handle interactions with the Front-end
/**
 * Routes Needed:
 *   1) GET Buskers
 *   2) GET Buskers - delinineated by category
 *   3) GET Performers by followers <-- NEED TO ADD
 * Performer View
 *   4) GET thier own performances
 *   5) POST new performance
 *   6) PUT - edit performance (params will include properties included within the events doc)
 *   7) DELETE a performance OR all performances
 *   8) GET number of followers
 * Mixed
 *   9) GET profile - Busker
 *  10) GET profile - audience member
 *  11) DELETE profile
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

// 3) Need to ADD Below
// --------------Performer View--------------------------------------

// 4)
app.get('/buskers/:name/events', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      // NOTE: This result Object must be reconfigured to Handle events properly.
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 5)
app.post('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  const newEvent = {
    location: body.location,
    coordinates: body.coordinates,
    date: body.date,
    time: body.time,
  };
  await database.addEventFor(name, newEvent)
    .then(() => {
      res.send(201);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 6)
app.put('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  const updatedEvent = {
    event: body,
  };
  await database.updateEventFor(name, updatedEvent)
    .then(() => {
      res.send(204);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 7)
app.delete('/buskers/:name/events', async ({ params, body }, res) => {
  const { name } = params;
  const eventToBeDeleted = body;
  await database.deleteEventFor(name, eventToBeDeleted)
    .then(() => {
      res.send(204);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// 8)
app.get('/buskers/:name/followers', async ({ params }, res) => {
  const { name } = params;
  await database.findBuskerByName(name)
    .then((results) => {
      // NOTE: This result Object must be reconfigured to Handle followers properly.
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

// --------------Mixed--------------------------------------
// 9)
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
  res.send('TEST');
});

// 10)
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

// 11)
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

// --------------RANDOM TO BE DELETED--------------------------------------
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

// Routes to handle logging in & logging out
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

const PORT = 3000;

// starting the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on Port:${PORT}`);
});
