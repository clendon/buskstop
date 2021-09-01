const mongoose = require('mongoose');
const keys = require('../../env/config');

const m = new mongoose.Mongoose();
m.connect(keys.mongodb.dbURI,
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
