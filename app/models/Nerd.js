// grab the mongoose module
var mysql = require('mysql');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mysql.model('Nerd', {
	name : {type : String, default: ''}
});
