// app.js

// load packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// CONFIG app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CONFIG server port
var port = process.env.PORT || 8080;
console.log("PORT : " + port);

// DEFINE model
var bookModel = require('./models/books');

// CONFIG router
var route = require('./routes')(app, bookModel);

// CONFIG mongoose
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // Connected to mongoDB serber
    console.log("Connected to mongoDB server !");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial').then(() => {
    console.log("Connected !");
}).catch((err) => {
    console.log("Not Connected db : " + err);
});

// RUN SERVER
var server = app.listen(port, function(){
    console.log("Express server has started !");
});