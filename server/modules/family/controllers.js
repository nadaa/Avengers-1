var models=require('./models');
// var request = require('request');
var bcrypt = require('bcrypt');


// this function will be invoked from the router /signUp

// exports.signupUser = function (req, res) {

//   	var newUser={
// 	email:req.body.email,
// 	name:req.body.username,

// 	//need to encrypt the password first
// 	password:req.body.password,
// 	bDate:req.body.DateOfBirth,
// 	familyId:req.body.familyId
// 	}
//     //console.log(newUser)
// 	new models.User(newUser).save(function(err){
		
// 		res.send(newUser);
// 	})
// };


exports.signupUser = function(req, res) {
 


 var newUser={
  username : req.body.user.username,  
   email :req.body.user.email,   
   password :req.body.user.password,   
   bdate :req.body.user.bdate,   
   role :req.body.user.role,   
   rank :req.body.user.rank,
  familyId :req.body.user.familyId,
}
  
  new models.User(newUser).save(function(err){
    if(err){
      res.send({msg:err})
    }

    else{
      res.send({msg:"create a new user"});
    }

  })
    
    }


  // models.User.findOne({ email: email },function(err,found){

   // if (!found ){
   //   var newUser =new models.User({
   //    username:username,
   //    email: email,
   //    password: password,
   //    DateOfBirth: DateOfBirth,
   //    role:role,
   //    rank:rank,
   //    familyId:familyId
   //  });
   //   bcrypt.hash(password, 10, function(err, hash) {
   //    newUser.password=hash;
   //    newUser.save(function(err,obj) {
   //     if(err){
   //      res.status(500).send(err);
   //      res.send("error");
   //    }
   //    else{
   //      res.status(201).send("Thank You");
   //      res.send("success signup");
   //    }
   //  })
   //  });
       
   //   }
   //   else{
   //    res.status(201).send("")
   //  }
  // })








exports.signinUser = function(req, res) {
  var email = req.body['states[email]'];
  var passWord = req.body['states[password]'];
  models.User.findOne({ email: email },function(err,user){
   if (!user ){
    console.log("user not exist")
  } else {
    var data="kk";
    models.User.comparepassword(password,user.password, function(err,match) {
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


