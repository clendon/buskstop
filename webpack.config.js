var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{test: /\.js$|.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}]
  }
}