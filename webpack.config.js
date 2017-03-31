var path = require('path');

module.exports = {
  entry: './index.js',
  output: { path: __dirname, filename: '/build/bundle.js' }, //output path voor de bundle js

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
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.json$/,            // Load JSON-files into code base.
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  },
};
