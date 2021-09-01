const mongoose = require('mongoose');
const keys = require('../../env/config');

const m = new mongoose.Mongoose();
m.connect(keys.mongodb.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const user = m.Schema({
  username: 'string',
  password: 'string',
});
module.exports = { user };
