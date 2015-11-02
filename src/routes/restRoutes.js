/*eslint-disable*/

module.exports = [
  {
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
      var response = reply('GET Hello, world!!!');
      console.log("GET request to /test");
      return response;
    }
  },
];
