var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create idea schema
var ideaSchema = new Schema({
  title: String,
  text: String
});

var Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;