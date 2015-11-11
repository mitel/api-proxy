# api-proxy
An experimental stateless proxy for abstracting multiple REST APIs

Based on Hapi.js and the great falcor-router from Netflix. 
Sample test routes that trigger some Avamar REST API calls through a js sdk.

##Getting Started

Install Node.js - check the NVM project for that: https://github.com/creationix/nvm

Clone this repository, open a terminal and run `npm install`.

Edit `src/avamar-sdk/apiConfig.js` with your own REST API and Avamar settings.

`npm run start` will start the proxy. 
