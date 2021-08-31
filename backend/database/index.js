const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb+srv://Admin:Admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error'));
// eslint-disable-next-line no-console
db.once('open', () => console.log('Connected to MongoDB'));

// Schema for People (ALL USERS)
const { Schema } = mongoose;
const peopleSchema = new Schema({
  ID: String,
  Name: String,
  Category: String || undefined,
  events: [
    {
      location: String,
      Coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
    {
      location: String,
      Coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
    {
      location: String,
      Coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
  ],
  Description: String,
  Image: String,
  AudienceorPerformer: String,
  followers: [
    String,
  ],
});

// Model for People
const People = mongoose.model('people', peopleSchema, 'people');

// Functions correlating to the People Collection
const findBuskers = async () => People.find({ AudienceorPerformer: 'Performer' });

const findBuskerByCategory = async (category) => {
  // eslint-disable-next-line no-console
  console.log('In Database:', category);
  const results = await People.find({ Category: category }).limit(10);
  // eslint-disable-next-line no-console
  console.log(results);
  return results;
};
const newUserSchema = new Schema({
  username: String,
  password: String,
});
const NewUser = mongoose.model('users', newUserSchema);

const addNewUser = (user) => {
  const newuser = new NewUser({
    username: user.username,
    password: user.password,
  });

  // eslint-disable-next-line consistent-return
  newuser.save((err, saved) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } return saved;
  });
};

module.exports = {
  models: {
    NewUser,
    People,
  },
  findBuskers,
  findBuskerByCategory,
  addNewUser,
};
