/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var mysql = require("mysql");

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Endpoint to be call from the client side
app.post( '/testmysql', function(req, res) {
	var con = mysql.createConnection({
  		host     : '192.155.247.248',
  		user     : 'uRQd51HYZopqO',
  		port     : '3307',
  		password : 'pBjXcSTm42BHl',
  		database : 'd5af20ff182a741f1ae05394a96d7e533'
	});

	con.connect(function(err){
    	if(err){
      		console.log('Error connecting to Db');
      		console.log(err);
      		return;
    	}
    	console.log('Connection established');
	});
  
} );

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
