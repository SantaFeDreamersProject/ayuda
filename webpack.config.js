var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    __dirname + '/client/entry'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/public/js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    },
    {test: /\.styl/, loader: 'style-loader!css-loader!stylus-loader'}
  ]
  },
  resolve: {
    alias: {
      "client" : __dirname + '/client',
      "style": __dirname + '/client/style',
      "bootstrap": "react-bootstrap"
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.json', '.styl', '.css']
  }
}
