const mongoose = require('mongoose');
const m = new mongoose.Mongoose();
m.connect('mongodb://localhost:27017/buskstop',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
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
  dateAndTime: 'string'
})
const peopleModel = m.model('people', peopleSchema)
module.exports = {
  models: {
    people: peopleModel
  }
}