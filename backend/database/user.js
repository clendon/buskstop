const mongoose = require('mongoose');
const m = new mongoose.Mongoose();
m.connect('mongodb+srv://Admin:admin@cedar-dev.q0mjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const user = m.Schema({
  username: 'string',
  password: 'string'
})
module.exports('User', user)