var models=require('./models');
var bcrypt = require('bcrypt');


// const session = require('express-session');

exports.signupUser = function(req, res) {
var newUser =new models.User({
       username : req.body.user.username,  
       email :req.body.user.email,   
       password :req.body.user.password,   
       bdate :req.body.user.bdate,   
       role :req.body.user.role,   
       familyId :parseInt(req.body.user.familyId),
    });
  models.User.findOne({ email: req.body.user.email },function(err,found){

   if (!found ){
     
      bcrypt.hash(newUser.password, 10, function(err, hash) {
      newUser.password=hash;
      // console.log(' newUser.password', hash)

      newUser.save(function(err,obj) {
       
         if(err){
          res.status(500).send({msg:"error"});
      
        }
        else{
          res.status(201).send({msg:"success signup"});

        }
      
      });
       
     })
  }

  else{
      res.status(201).send({msg:'choose another email'})
    }
    
})


// console.log(newUser);
}

exports.signinUser = function(req, res) {
 models.User.findOne({'username':req.body.user.username},function (err, data) {
  console.log('data',data)
    if(data===null){
      res.send({msg:"no account"})
    }

      else if(data !== null){

  // console.log('data',data)
    if(err){
      res.status(404).send({msg:"no account"})}
      if(data !== null){
        bcrypt.compare(req.body.user.password, data.password, function(err, resCrypt) {
          if(!resCrypt){res.send({msg:"the password is not correct"})}
            else if(resCrypt){
              req.session._id=data._id;
              req.session.username=data.username;
              req.session.password=data.password;
              res.send({msg:"success"})

            }
          });

      }
    });
};


