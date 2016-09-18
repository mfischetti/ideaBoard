require('dotenv').config()

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser= require('body-parser')
var PORT = process.env.PORT || 3000;
var database = require('./config/database');
var Idea = require('./app/models/ideas');

app.use(bodyParser.urlencoded({extended: true}))
app.use("/styles", express.static(__dirname + '/public/styles'));

//connect to remote mongodb
mongoose.connect(database.url); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/idea', function(req, res){
  var newIdea = Idea({
    idea: req.body.idea,
    description: req.body.description
  });
  
  //save the new idea
  newIdea.save(function(err) {
    if (err) throw err;
    console.log('Idea created!');
    res.redirect('/')
  });
})

app.listen(PORT, function(){
  console.log('listening on port: '+ PORT);
});