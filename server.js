require('dotenv').config()

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser= require('body-parser')
var PORT = process.env.PORT || 3000;
var database = require('./config/database');
var Idea = require('./app/models/ideas');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use("/styles", express.static(__dirname + '/public/styles'));

//connect to remote mongodb
mongoose.connect(database.url); 

app.get('/', function(req, res){
  Idea.find({}, function(err, result) {
    if (err) throw err;
      res.render('index.ejs', {ideas: result})
  });
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