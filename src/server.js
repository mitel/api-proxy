/*eslint-disable*/

var Hapi = require('hapi');
var Path = require('path');
// var Tv = require('tv');
var falcorRoutes = require('./routes/falcorRoutes');
var restRoutes = require('./routes/restRoutes');

var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
                additionalHeaders: ['X-Requested-With']
            },
            //cors: true
            // files: {
            //     relativeTo: Path.join(__dirname, '../client'),
            // },
        }
    }
});

// append all defined routes into an array passed to server.route()
var routes = Array.prototype.concat.apply([], [
    restRoutes, falcorRoutes
]);

var portnumber = process.env.VCAP_APP_PORT || 8080;

server.register( require('inert'), function (err) {

  server.connection({ port: portnumber });
  server.path('.');
  server.route(routes);

  if (!err && !module.parent) {
    if (!err) {
      server.start(function () {
        console.log('hapi.js server running at:', server.info.uri);
      });
    }
  }
});

module.exports = server;
