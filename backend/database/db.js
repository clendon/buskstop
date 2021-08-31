const mongoose = require('mongoose');

const m = new mongoose.Mongoose();
m.connect('mongodb+srv://Admin:Admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const peopleSchema = m.Schema({
  id: 'string',
  name: 'string',
  location: 'string',
  coordinates: 'string',
  category: 'string' || undefined,
  description: 'string',
  profileImageURL: 'string',
  audienceOrPerformer: 'string',
  dateAndTime: 'string',
});
const peopleModel = m.model('people', peopleSchema);

// this will eventually be built out with more models
module.exports = {
  people: peopleModel,
  // TODO: add more models
};
