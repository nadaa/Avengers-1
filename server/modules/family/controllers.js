var models=require('./models');



// this function will be invoked from the router /signUp

exports.createUser = function (req, res) {
	var newUser={
	email:req.body.email,
	name:req.body.name,

	//need to encrypt the password first
	password:req.body.password,
	bDate:req.body.bData,
	familyId:req.body.familyId
	}

	new models.User(newUser).save(function(err){
		console.log("sucess creating a new user");
		res.send(newUser);
	})
};






