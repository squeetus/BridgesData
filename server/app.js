/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var helmet = require('helmet');	// https://github.com/helmetjs/helmet
var path = require('path');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

// console.log(config.mongo);
// Populate DB with sample data
if(config.seedDB) {require('./config/seed'); }

// Setup server
var app = express();
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

server.on('error', function(err) {
	console.log(':(' + err);
});

// Expose app
exports = module.exports = app;
