const mongoose = require('mongoose');
	//to avoide deprecating warrings of mongodb promise
mongoose.Promise=global.Promise;

 mongoose.connect('mongodb://localhost/homeDb');
//mongoose.connect('mongodb://avengers:123456@ds137740.mlab.com:37740/avengers');

 
const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

module.exports = db;