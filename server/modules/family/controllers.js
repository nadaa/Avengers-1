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
 

// res.send('{msg:err}')
//  var newUser={
//   username : req.body.user.username,  
//    email :req.body.user.email,   
//    password :req.body.user.password,   
//    bdate :req.body.user.bdate,   
//    role :req.body.user.role,   
//    rank :req.body.user.rank,
//   familyId :req.body.user.familyId,
// }
  
//   new models.User(newUser).save(function(err){
//     if(err){
      
//       console.log("error occured")
//     }

//     else{
      
//       console.log("success")
//     }

//   })
    

var newUser =new models.User({
       username : req.body.user.username,  
       email :req.body.user.email,   
       password :req.body.user.password,   
       bdate :req.body.user.bdate,   
       role :req.body.user.role,   
       rank :req.body.user.rank,
       familyId :parseInt(req.body.user.familyId),
    });
    

console.log(req.body.user.email)
  models.User.findOne({ email: req.body.user.email },function(err,found){

   if (!found ){
     
      bcrypt.hash(newUser.password, 10, function(err, hash) {
      newUser.password=hash;
      console.log(' newUser.password', hash)



      newUser.save(function(err,obj) {
       
         if(err){
          res.status(500).send({msg:"error"});
         // res.send({msg:"error"});
        }
        else{
          res.status(201).send({msg:"success signup"});

          //res.send({msg:"success signup"});
        }
      
      });
       
     })
     
  }

  else{
      res.status(201).send({msg:'choose another email'})
    }
    
})


console.log(newUser);
}

// exports.signinUser = function(req, res) {
//   var email = req.body['states[email]'];
//   var passWord = req.body['states[password]'];
//   models.User.findOne({ email: email },function(err,user){
//    if (!user ){
//     console.log("user not exist")
//   } else {
//     var data="kk";
//     models.User.comparepassword(password,user.password, function(err,match) {
//       if (match) {
//         data="coreeeeect";
//         res.status(201).send(data);
//             console.log("coreeeeect");
//           } else {
//             console.log("innnnncoreeeeect");
//             data="";
//             res.status(201).send(data);
//           }
//         });
//       }
//     });
// };


