require('dotenv').config()

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var database = require('./config/database');

//connect to remote mongodb
mongoose.connect(database.url); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
}); 

app.listen(PORT, function(){
  console.log('listening on port: '+ PORT);
});