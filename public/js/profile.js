var mongoose = require('mongoose');

mondule.exports = mongoose.model('userProfile', {
	username : String,
	password : String,
	email : String,
	phone : Number,
	shuttleStop : {type : Number, min : 1, max : 4}
	walk : Boolean,
	bike : Boolean,
	car : Boolean,
	licence : String,
	make : String,
	model : String,
	year : Number,
	color : String,
	address1 : String,
	address2 : String,
	address3 : String,
	profilePicUrl : Buffer,
	carPicUrl : Buffer,
	destination : String,
	carpoolreq1 : String,
	carpoolreq2 : String,
	carpoolreq3 : String,
	carpoolreq4 : 0
});