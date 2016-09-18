require('dotenv').config()

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser= require('body-parser')
var PORT = process.env.PORT || 3000;
var database = require('./config/database');

app.use(bodyParser.urlencoded({extended: true}))

//connect to remote mongodb
mongoose.connect(database.url); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
}); 
app.post('/idea', function(req, res){
  console.log('New idea posted: '+req.body.idea+'\n'+'Description: '+req.body.description);
})

app.listen(PORT, function(){
  console.log('listening on port: '+ PORT);
});