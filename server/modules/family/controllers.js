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
        if(!resCrypt){
          res.status(500).send({msg:"the password is not correct"})
        }
        else if(resCrypt){
          req.session._id=data._id;
          req.session.username=data.username;
          req.session.password=data.password;
          res.status(201).send({msg:"success login"})
        }
      });
    }
  };
})
}

exports.getAllKids=function(req,res){
  var familyId=req.params.familyid;
  models.User.find({$and:[{familyId:familyId},{role:'kid'}]},function(err,kids){
    if(err){
      console.log("error");
      res.status(500).send();
    }
    else{
    //console.log(kids);
    res.status(200).send(kids);
  }
})
}


exports.setKidTask=function(req,res){
  var newTask={
    taskName:req.body.task,
    userEmail:req.body.kidemail
  }
  new models.Task(newTask).save(function(err,task){
    if(err){
      console.log("error adding a new Task");
      res.status(500).send();
    }
    else{
      console.log('a new task is added',task);
      res.status(200).send();
    }
  })

}

exports.getTasks=function(req,res){
  var kidEmail=req.body.kidemail;
  models.Task.find({userEmail:kidEmail},function(err,tasks){
    if(err){
      res.status(500).send();
    }
    else{
      //console.log(tasks);
      res.status(200).send(tasks)
    }

  })
}

exports.sendUserInfo=function(req,res){
  var newInfo=new models.Family({
    jobtitle:req.body.user.jobtitle,
    workaddress:req.body.user.workaddress,
    worknumber:req.body.user.worknumber,
    worktime:req.body.user.worktime,
    salary:req.body.user.salary,
    familyId:req.body.user.familyId,
    marriageDate:req.body.user.marriageDate,
  })
  newInfo.save(function(error,data){
    if(error){
      res.send({msg:"error"})
    }else{
      res.send({msg:"success"})
    }
  })
}


exports.getKidsId= function(req,res){
  var familyId=req.body.familyId;

  models.User.find( {$and: [ {role:"kid"}, { familyId:familyId } ] },function (err, kids) {
    
    res.send(kids)
  });
};

exports.sendShortage=function(req,res){
  var newShortage=new models.Shortage({
    room:req.body.needs.room,
    need:req.body.needs.need,
  })
  console.log('newShortage',newShortage)
  newShortage.save(function(error,data){
    if(error){
      res.send({msg:"error"})
    }else{
       console.log('success')
      res.send({msg:"success"})
    }
  })
}

//jozaa for test login 2
exports.signinUser2=function(req, res){
  console.log('CALL LOGIN 2 CONTROLLER');
  models.User.findOne({'email':req.body.user.email},function(err, data){
    if(data===null){
      res.send({msg:"no account"});
    }else if(data!==null){
      if(err){
        res.send(err);
      }else{
        bcrypt.compare(req.body.user.password, data.password, function(err, resCrypt) {
          if(!resCrypt){
            res.send({msg:"the password is not correct"});
          }else if(resCrypt){
            req.session._id=data._id;
            req.session.username=data.username;
            req.session.password=data.password;
            res.send({msg:"success login",email:req.body.user.email});
          }
        });
      }
    };
  })
}









