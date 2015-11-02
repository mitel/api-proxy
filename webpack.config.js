/*eslint-disable*/
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I

// pentru falcor-router / hapijs:
// copiez rx-3.1.2 in node_modules din falcor-router

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  cache: true,
  context: __dirname,
  debug: true,
  devtools: "source-map",
  entry:   ["./src/server.js"],

  // resolve: {
  //   alias: {
  //     'rx$': require.resolve('rx/dist/rx')
  //   }
  // },

  output:  {
    path:     path.join(__dirname, "dist"),
    filename: "proxy.js"
  },

  // externals: nodeModules, // http://jlongster.com/Backend-Apps-with-Webpack--Part-I

  plugins: [
    new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true}),
    new webpack.DefinePlugin({"global.GENTLY": false}),
    new webpack.DefinePlugin({ 'ENV.browser': false }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json-loader']},
      {include: /\.js$/, loaders: ['babel-loader?stage=1&optional=runtime'],
        exclude: [/node_modules/]}
    ]
  },

  resolve: {
    extensions: ["", ".json", ".jsx", ".js"],
    modulesDirectories: [
      "server", "node_modules"
    ]
  },

  node:    {
    __dirname: true,
    fs:        'empty'
  }

}
