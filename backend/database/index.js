const mongoose = require('mongoose');

// Connection
mongoose.connect('mongodb+srv://Admin:Admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error'));
// eslint-disable-next-line no-console
db.once('open', () => console.log('Connected to MongoDB'));

// Schemas
const { Schema } = mongoose;
const peopleSchema = new Schema({
  id: String,
  name: String,
  category: String || undefined,
  events: [
    {
      location: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
    {
      location: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
    {
      location: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      date: Date,
      time: String,
    } || undefined,
  ],
  description: String,
  profileImageURL: String,
  AudienceorPerformer: String,
  followers: [
    String,
  ],
});

const People = mongoose.model('people', peopleSchema, 'people');

const findBuskers = async () => People.find({ AudienceorPerformer: 'Performer' });

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
  addNewUser,
};
