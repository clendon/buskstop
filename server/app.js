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
app.use(express.static(path.join(__dirname, 'public')))


// routes
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