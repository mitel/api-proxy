import FalcorServer from 'falcor-hapi';
import Router from 'falcor-router';
import initSDK from '../avamar-sdk/initSDK';

// let session, resourcePool, dpr, tenant, resourceShare, folder; // eslint-disable-line
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
            return {path: ['greeting'], 
            value: 'Hello World',
          };
          },
        },
        {
          route: 'version',
          async get() {
            console.log('..call to version route');
            let ver = {};
            
            try {
              ver = await sdk.getVersion();
            } catch (err) {
              console.log(err);
            }

            return {
              path: ['version'],
              value: ver.versions,
            };
          },
        },
        {
          route: 'authToken',
          async get() {
            console.log('.. call to get an auth token');
            let session;

            try {
              session = await sdk.login();
            } catch (err) {
              console.log(err);
              throw new Error(err);
            }

            return [
              { path: ['authToken'], value: session.authToken},
              { path: ['serviceProvider'], value: session.serviceProviderId },
            ];
          },
        },

        {
          route: 'session.login',
          async call(callPath, args) {
            console.log('.. call to login ..');
            let session;
            const [ username, password ] = args;
            
            try {
              session = await sdk.login(username, password);
            } catch (err) {
              console.log(err);
              throw new Error(err);
            } 

            return [
              { path: ['authToken'], value: session.authToken},
              { path: ['serviceProvider'], value: session.serviceProviderId },
            ];
          },
        }, 

        // https://github.com/Netflix/falcor-router-demo/blob/master/index.js
        {
          route: 'resourcePool.create',
          async call(callPath, args) {
            console.log('.. call to create a resource pool');
            let resourcePool;
            const [ authToken, serviceProviderId, resourcePoolName] = args;
            // console.log(args);

            // prepare the parameter for the sdk call..
            const resourcePoolConfig = {
              name: resourcePoolName,
            };

            try {
              // console.log(authToken);
              resourcePool = await sdk.createResourcePool(authToken, serviceProviderId, resourcePoolConfig);
            } catch (err) {
              console.log(err);
              throw new Error(err);
            } 

            return {
              path: ['resourcePool'],
              value: resourcePool.resourcePoolId,
            };
          },
        },
      ]);
    }),
  },
];
