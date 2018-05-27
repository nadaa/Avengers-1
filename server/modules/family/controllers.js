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
 models.User.findOne({'email':req.body.user.email},function (err, user) {
  //console.log('data',data)
  if(user===null){
    res.send({msg:"no account",user:null})
  }
  else if(user !== null){
  // console.log('data',data)
  if(err){
    res.status(404).send({msg:"no account",user:null})}
    if(user !== null){
      bcrypt.compare(req.body.user.password, user.password, function(err, resCrypt) {
        if(!resCrypt){
          res.status(500).send({msg:"the password is not correct"})
        }
        else if(resCrypt){
          req.session._id=user._id;
          req.session.username=user.username;
          req.session.password=user.password;
          res.status(201).send({msg:"success login",user:user})
        }
      });
    }
  };
})
}

exports.getAllKids=function(req,res){
  var familyId=req.params.familyid;
  models.User.find({$and:[{familyId:familyId},{role:'Child'}]},function(err,kids){
    if(err){
      console.log("error");
      res.status(500).send();
    }
    else{
    res.status(200).send(kids);
  }
})
}


exports.setKidTask=function(req,res){
  var newTask={
    taskName:req.body.task,
    email:req.body.kidemail
  }

  console.log(newTask);
  new models.Task(newTask).save(function(err,task){
    if(err){
      console.log("error adding a new Task");
      res.status(500).send();
    }
    else{
      console.log('a new task is added',task);
      res.status(200).send({msg:"a task was added sucessfully"});
    }
  })

}

exports.getTasks=function(req,res){
  var kidEmail=req.body.kidemail;
  models.Task.find({email:kidEmail},function(err,tasks){
    if(err){
      res.status(500).send();
    }
    else{
      console.log(tasks);
      res.status(200).send(tasks)
    }

  })
}


exports.confirmTask=function(req,res){
  var taskId=req.body.taskId;
  //for(var i=0;i<taskIds.length;i++){
    models.Task.deleteOne({$and:[{_id:taskId},{completed:true}]},function(err,task){
      if(err){
        res.status(500).send({deleted:false})
      }
      else{
        console.log("deleted ",taskId)
        res.status(200).send({deleted:true})
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


exports.toggleTask=function(req,res){
  var id=req.body.taskId;
  console.log(id)
  
  models.Task.findOne({_id:id},function(err,task){
    if(err){
      res.status(500).send(err);
    }
    else{
      task.completed=!task.completed;
      task.save(function(err){
        if(err){
          res.status(500).send({msg:task.taskName+'can not be changed'})
        }
        else{
          res.status(200).send({msg:task.taskName+' status changed'})
        }
      })
    }
  })

} 



exports.sendShortage=function(req,res){
  var familyId=req.body.familyId;
  var need=req.body.need;
  console.log('familyId',familyId)
  console.log('need',need)

  models.Shortage.findOne({familyId:familyId},function(err,data){
    if(data){
      data.needs.push(need)
      data.save(function(err){
        if(err){
          res.status(500).send({msg:'error'})
        }
        else{
          res.status(200).send({msg:''})
        }
      })
    }else{
      var arrNeeds=[];
      arrNeeds.push(need);
      var newShortage=new models.Shortage({
        familyId:familyId,
        needs:arrNeeds,
      })
      console.log('newShortage',newShortage)
      newShortage.save(function(err){
        if(err){
          res.status(500).send({msg:'error'})
        }
        else{
          res.status(200).send({msg:'success'})
        }
      })
    }
  })
}
exports.getShortage=function(req,res){
  models.Shortage.findOne({'familyid':req.body.familyid},function(err, data){
    if (err) {
      res.send(err)
    }
    var info=data
      //console.log('DATA: ',allData);
      res.send(info) 
  })

}

//jozaa for test login 2
exports.signinUser2=function(req, res){
  console.log('CALL LOGIN 2 CONTROLLER');
  models.User.findOne({'email':req.body.user.email},function(err, data){
    if(data===null){
      console.log("null data");
      res.send({msg:"no account"});
    }else if(data!==null){
      if(err){
        console.log("error");
        res.send(err);
      }else{
        bcrypt.compare(req.body.user.password, data.password, function(err, resCrypt) {
          if(!resCrypt){
            console.log("wrong password");
            res.send({msg:"the password is not correct"});
          }else if(resCrypt){
            req.session._id=data._id;
            req.session.username=data.username;
            req.session.password=data.password;
            console.log("success login");
            res.send({msg:"success login"});
          }
        });
      }
    };
  })
}

exports.getData=function(req, res){
  //console.log('CALL  GET DATA 2 CONTROLLER',req.body.email);
  models.User.findOne({'email':req.body.email},function(err, data){
    if (err) {
      res.send(err)
    }
    var allData=data
      //console.log('DATA: ',allData);
      res.send(allData) 
  })
}

exports.deleteShortage= function(req, res) {
  models.Shortage.remove({_id:req.body.familyid},function(err,data){
   if(err){
     res.status(500).send('error');
   }
   else{
    res.status(201).send('success');
  }
})
}





