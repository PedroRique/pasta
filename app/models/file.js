var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FileSchema = new Schema({
  filename : { type : String, required : true, unique : true},
  content : { type : String, required : false},
  createdAt : {type : Date, required: false}
});

FileSchema.methods.extractText = function () {
	
	// var pdfText = pdfData.name;

	return {success:true,message:"teste"};
}

module.exports = mongoose.model('File',FileSchema);

