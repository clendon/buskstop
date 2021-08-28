const express = require('express')
const mongo = require('mongodb');
const path = require('path');


// path to database
const db = require('../db/db.js')

// create server
const app = express()

// configuration
const PORT = 3000

// middleware
app.use(express.json());
app.use(express.static('public'))


// routes
app.get('/people', (req, res) => {
  db.people.find()
  .exec()
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    res.status(400).send(err.stack);
  })
});

app.post('/people', (req, res) => {
  res.sendStatus(201)
});

// starting the server
app.listen(PORT, () => {
  console.log(`Server is listening on Port:${PORT}`)
});