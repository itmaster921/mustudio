'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  server: {
    host: process.env.HOSTNAME
    || 'mustudio'
  },

  businessSitesDir: path.normalize(`${__dirname}/../../../../`) + 'mustudioBusinessSites',

  secrets: {
    session: 'musTUdio!s3cret2017'
  },

  s3: {
    //key: 'AKIAIRTHKD5LAWN7YIMA',
    key: 'AKIAJPUSZKJTZOJ7QP5Q',
    //secret: '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',
    secret: 'AnOVhlmImVuU173vowBLPwQorQKcoNEPYAZAY7tI',
    bucket: 'mu-upload',
    region: 'us-east-2'
  },

  email: {
    accountName: 'Meshup Studio',
    authType: 'OAuth2',
    username: 'themeshstudio@gmail.com',
		clientId: '149829301780-8ogqpdq0q5l7qt0tfnsalkn1sl9hhsik.apps.googleusercontent.com',
		clientSecret: 'EYnwss4Zhru0RcqIxuVtxtUl',
		refreshToken: '1/uNw5mJPV9_wYii16JQkJNsnvHzEZWz1HmfcDSsK0afXTSzJ4pira5g71qnWGzVZN',
    token: 'EMAIL2017@mustudio'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
