var models=require('./models');
var request = require('request');
var bcrypt = require('bcrypt');


// this function will be invoked from the router /signUp

// exports.createUser = function (req, res) {
// 	var newUser={
// 	email:req.body.email,
// 	name:req.body.name,

// 	//need to encrypt the password first
// 	password:req.body.password,
// 	bDate:req.body.bData,
// 	familyId:req.body.familyId
// 	}

// 	new models.User(newUser).save(function(err){
// 		console.log("sucess creating a new user");
// 		res.send(newUser);
// 	})
// };


exports.signupUser = function(req, res) {
  var username = req.body['states[username]'];
  var email = req.body['states[email]'];
  var password = req.body['states[password]'];
  var DateOfBirth = req.body['states[DateOfBirth]'];
  console.log(User,"user")

  User.findOne({ email: email },function(err,found){

   if (!found ){
     var newUser = new User({
      username:username,
      email: email,
      password: password,
      DateOfBirth: DateOfBirth

    });
     bcrypt.hash(password, 10, function(err, hash) {
      newUser.password=hash;
      newUser.save(function(err,obj) {
       if(err){
        res.status(500).send(err);
        console.log("error")
      }
      else{
        res.status(201).send("Thank You");
      }
    })
    });
       
     }
     else{
      res.status(201).send("")
    }
  })
}
exports.signinUser = function(req, res) {
  var email = req.body['states[email]'];
  var passWord = req.body['states[password]'];
  User.findOne({ email: email },function(err,user){
   if (!user ){
    console.log("user not exist")
  } else {
    var data="kk";
    User.comparepassword(password,user.password, function(err,match) {
      if (match) {
        data="coreeeeect";
        res.status(201).send(data);
            console.log("coreeeeect");
          } else {
            console.log("innnnncoreeeeect");
            data="";
            res.status(201).send(data);
          }
        });
      }
    });
};


