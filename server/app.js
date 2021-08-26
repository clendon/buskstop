const express = require('express');
const path = require('path');

const app = express();


// configuration
const port = 3000;


//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))


// routes
app.get('/', (req, res) => {
  res.send('Hello Test!');
});

app.listen(port, () => {
  console.log(`app listening on port${port}`)
});

// app basic functionality is up and running