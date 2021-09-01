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
  Events: [
    {
      location: String,
      coordinates: String,
      date: String,
    } || undefined,
  ],
  Description: String,
  image: String,
  AudienceorPerformer: String,
  followers: [
    String,
  ],
});

// Model for People
const People = mongoose.model('people', peopleSchema, 'people');

// Functions correlating to the People Collection
const findBuskers = async () => People.find({ AudienceorPerformer: 'Performer' });

const findBuskerByCategory = async (category) => People.find({ Category: category });

const findBuskerByName = async (name) => People.find({ Name: name });

const addEventFor = async (name, event) => {
  const newEvent = {
    location: event.location,
    coordinates: event.coordinates,
    date: event.date,
  };
  await People.updateOne({ Name: name }, { $push: { Events: newEvent } });
};

const updateEventFor = async (name, event) => {
  const newEvent = {
    location: event.location,
    coordinates: event.coordinates,
    date: event.date,
  };

  await People.findOneAndUpdate({ Name: name, 'Events.coordinate': event.coordinates }, { $set: { 'Events.$': newEvent } });
};

const deleteEventFor = async (name, event) => {
  // eslint-disable-next-line max-len
  await People.findOneAndUpdate({ Name: name }, { $pull: { Events: { location: event.location } } });
};

const deleteProfileFor = async (name) => People.findOneAndDelete({ Name: name });

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
  findBuskerByName,
  addEventFor,
  updateEventFor,
  deleteEventFor,
  deleteProfileFor,
  addNewUser,
};
