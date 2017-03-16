var path = require('path');

module.exports = {
  entry: './index.js',
  output: { path: __dirname, filename: '/bundle/bundle.js' },

  devServer: {
    inline: true,
    port: 3001
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
