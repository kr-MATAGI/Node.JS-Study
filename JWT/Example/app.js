/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/**
 * Config
 */
const config = require('./config');
const port = process.env.PORT || 3000;

/**
 * Express config
 */

const app = express();

// parse Json and url-encoded query
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// print the request log on console.
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// index page, just for testing
app.get('/', function(req, res){
    res.send('Hello JWT');
});

// configure api router
const api = require('./routes/api');
app.use('/api', api);

// open the server
app.listen(port, function() {
    console.log('Express is running on port', port);
});

/**
 * Connect to mongodb server
 */
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    // Connected to mongoDB server
    console.log("Connected to mongoDB server !");
});
mongoose.connect('mongodb://localhost/mongodb').then( function(){
    console.log("Connected !");
}).catch((err) => {
    console.log("Not Connected db : " + err);
});