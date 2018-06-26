var mongoose = require('mongoose');
var IssueSchema = new mongoose.Schema({
	userid  : String,
	issue   : String,
	type : String
	
});
mongoose.model('Issue',IssueSchema);
module.exports = mongoose.model('Issue');