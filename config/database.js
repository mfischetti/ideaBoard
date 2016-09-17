require('dotenv').config();

var URL = process.env.DB_URL;
var USER = process.env.DB_USER;
var PASS = process.env.DB_PASS;

module.exports = {
    url : 'mongodb://'+ USER + ':'+PASS+URL,
};