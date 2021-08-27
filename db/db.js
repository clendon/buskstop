const mongoose = require('mongoose');
const m = new mongoose.Mongoose();
m.connect('mongodb://localhost:27017/buskstop',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const examplePeopleSchema = m.Schema({
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
const examplePeopleModel = m.model('examplePeople', examplePeopleSchema)
module.exports = {
  models: {
    exampleData: examplePeopleModel
  }
}