/**
 * @author Joe Passanante
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
});


//export that schema
module.exports = mongoose.model('book', Schema,"books");
