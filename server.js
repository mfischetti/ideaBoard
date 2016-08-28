var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Idea Board');
}); 

// Listen on env port for heroku or 3000 if locally
app.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});