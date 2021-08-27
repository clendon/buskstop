const PORT = 3000
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/db.js')
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))
app.get('/people', (req, res) => {
  db.models.people.find()
  .exec()
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    console.log('you have an err', err)
    res.end()
  })
})
app.post('/people', (req, res) => {
  res.sendStatus(201)
})
app.listen(PORT, () => {
  console.log(`Server is listening on Port:${PORT}`)
})
// app basic functionality is up and running