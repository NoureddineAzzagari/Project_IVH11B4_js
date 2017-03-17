var path = require('path');

module.exports = {
  entry: './index.js',
  output: { path: __dirname, filename: '/bundle/bundle.js' }, //output path voor de bundle js

  //devserver settings
  devServer: {
    inline: true,
    port: 3001
  },

  //maak gebruik van source maps
  devtool: 'source-map',

  module: {
    //alle loaders die gebruikt worden tijdens het builden
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
