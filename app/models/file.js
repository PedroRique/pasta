var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FileSchema = new Schema({
  filename : { type : String, required : true, unique : true},
  content : { type : String, required : false},
  createdAt : {type : Date, required: false}
});

module.exports = mongoose.model('File',FileSchema);

