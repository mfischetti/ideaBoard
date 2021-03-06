require('dotenv').config()

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser= require('body-parser')
var PORT = process.env.PORT || 3000;
var database = require('./config/database');
var Idea = require('./app/models/ideas');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/styles", express.static(__dirname + '/public/styles'));
app.use('/', express.static(path.join(__dirname, 'public')));

//connect to remote mongodb
mongoose.connect(database.url); 

app.get('/idea', function(req, res){
  Idea.find({}, function(err, result) {
   if (err) throw err;
      res.json(result);
  });
});

app.post('/idea', function(req, res){
  var newIdea = Idea({
    title: req.body.title,
    text: req.body.text
  });
  
  //save the new idea
  newIdea.save(function(err) {
    if (err) throw err;
    console.log('Idea created!');
  });
});

app.listen(PORT, function(){
  console.log('listening on port: '+ PORT);
});