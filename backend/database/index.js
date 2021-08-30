const mongoose = require('mongoose');

//Connection
mongoose.connect('mongodb+srv://Admin:Admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connected to MongoDB'))

//Schemas
const {Schema} = mongoose;
let peopleSchema = new Schema({
  id: String,
  name: String,
  category: String || undefined,
  events: [
     {
     location: String,
     coordinates: {
        lat: Number,
        lng: Number
      },
    date: Date,
    time: String,
    } || undefined,
    {
     location: String,
     coordinates: {
        lat: Number,
        lng: Number
      },
    date: Date,
    time: String,
    } || undefined,
    {
      location: String,
     coordinates: {
        lat: Number,
        lng: Number
      },
    date: Date,
    time: String,
    } || undefined
  ],
  description: String,
  profileImageURL: String,
  audienceOrPerformer: String,
  followers: [
    String
  ]
})

let people = mongoose.model('people', peopleSchema, 'people')

let newUserSchema = new Schema({
  username: String,
  password: String,
})
let newUser = mongoose.model('users', newUserSchema);

const addNewUser = (user) => {
  let newuser = new newUser({
    username: user.username,
    password: user.password
  })

  newuser.save((err, saved) => {
    if (err => {
      console.log(err)
    })
    return saved
  })
}


module.exports = {
  models: {
    newUser: newUser,
    people: people
  },
  addNewUser: addNewUser
}


