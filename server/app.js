/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
const fs = require('fs-extra');
import evh from 'express-vhost';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});


// Setup Business App
var businessApp = express();
businessApp.use(express.static(config.businessSitesDir));
require('./businessApp').default(businessApp);

// Setup server
var app = express();
var server = http.createServer(app);
app.use(evh.vhost(app.enabled('trust proxy')));
evh.register('*.' + config.server.host, businessApp);

require('./config/express').default(app);
require('./routes').default(app);

// Ensure businessSites directory exists, if not, then it will be created
const dir = config.businessSitesDir;
try {
  fs.ensureDir(dir, err => {
    console.log('businessSitesDir', err);
  });
} catch (err) {
  console.log('ensureDir', err);
}

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

/*
var node_reverse_proxy = require('node-reverse-proxy');

var ip = '127.0.0.1';
var reverse_proxy = new node_reverse_proxy({
  '' : ip + ':8080'
});

reverse_proxy.start(80); */

// Expose app
exports = module.exports = app;
