import FalcorServer from 'falcor-hapi';
import Router from 'falcor-router';
import initSDK from '../avamar-sdk/initSDK';

let session, resourcePool, dpr, tenant, resourceShare, folder; // eslint-disable-line
const sdk = initSDK();

module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/model.json',
    handler: FalcorServer.dataSourceRoute((req, res) => {
      console.log('Request to /model.json');
      return new Router([
        {
          // match a request for the key "greeting"    
          route: 'greeting',
          // respond with a PathValue with the value of "Hello World."
          get: () => {
            return {path: ['greeting'], value: 'Hello World'};
          },
        },
      ]);
    }),
  },
];
