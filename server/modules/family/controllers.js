var models=require('./models');
var bcrypt = require('bcrypt');

//signup function to add new user
exports.signupUser = function(req, res){
  var newUser =new models.User({
    username : req.body.user.username,  
    email :req.body.user.email,   
    password :req.body.user.password,   
    bdate :req.body.user.bdate,   
    role :req.body.user.role,   
    familyId :req.body.user.familyId,
  });
  models.User.findOne({ email: req.body.user.email },function(err,found){
    if (!found ){
      bcrypt.hash(newUser.password, 10, function(err, hash){
        newUser.password=hash;
        newUser.save(function(err,obj){
          if(err){
            res.status(500).send({msg:"error"});
          }else{
            res.status(201).send({msg:"success signup"});
          }
        }); 
      })
    }else{
      res.status(201).send({msg:'choose another email'})
    }
  })
}

//to check if the user exists in the database
exports.signinUser = function(req, res) {
  models.User.findOne({email:req.body.user.email},function (err, user) {
    if(user===null){
      res.send({msg:"no account",user:null})
    }else if(user !== null){
      if(err){
        res.status(404).send({msg:"no account",user:null})
      }
      if(user !== null){
        bcrypt.compare(req.body.user.password, user.password, function(err, resCrypt) {
          if(!resCrypt){
            res.status(500).send({msg:"the password is not correct"})
          }else if(resCrypt){
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

// send all kids that have the same familyId
exports.getAllKids=function(req,res){
  var familyId=req.params.familyid;
  models.User.find({$and:[{familyId:familyId},{role:'Child'}]},function(err,kids){
    if(err){
      res.status(500).send();
    }else{
      res.status(200).send(kids);
    }
  })
}

//set task for a given kid
exports.setKidTask=function(req,res){
  var newTask={
    taskName:req.body.task,
    email:req.body.kidemail
  }
  new models.Task(newTask).save(function(err,task){
    if(err){
      res.status(500).send();
    }
    else{
      res.status(200).send({msg:"a task was added sucessfully"});
    }
  })
}

// get all tasks for a given kid
exports.getTasks=function(req,res){
  var kidEmail=req.body.kidemail;
  models.Task.find({email:kidEmail},function(err,tasks){
    if(err){
      res.status(500).send();
    }else{
      res.status(200).send(tasks)
    }
  })
}

//check if the kid delete his task
exports.confirmTask=function(req,res){
  var taskId=req.body.taskId;
  models.Task.deleteOne({$and:[{_id:taskId},{completed:true}]},function(err,task){
    if(err){
      res.status(500).send({deleted:false})
    }
    else{
      res.status(200).send({deleted:true})
    }
  })
}

// send back loggen user info
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

//toggle tasks checkbox
exports.toggleTask=function(req,res){
  var id=req.body.taskId;
  models.Task.findOne({_id:id},function(err,task){
    if(err){
      res.status(500).send(err);
    }else{
      task.completed=!task.completed;
      task.save(function(err){
        if(err){
          res.status(500).send({msg:task.taskName+'can not be changed'})
        }else{
          res.status(200).send({msg:task.taskName+' status changed'})
        }
      })
    }
  })
} 

//to add family shortage list
exports.sendShortage=function(req,res){
  var familyId=req.body.familyId;
  var need=req.body.need;
  models.Shortage.findOne({familyId:familyId},function(err,data){
    if(data){
      data.needs.push(need)
      data.save(function(err){
        if(err){
          res.status(500).send({msg:'error'})
        }else{
          res.status(200).send({msg:'success'})
        }
      })
    }else{
      var arrNeeds=[];
      arrNeeds.push(need);
      var newShortage=new models.Shortage({
        familyId:familyId,
        needs:arrNeeds,
      })
      newShortage.save(function(err){
        if(err){
          res.status(500).send({msg:'error'})
        }else{
          res.status(200).send({msg:'success'})
        }
      })
    }
  })
}

//send back family shortage list abon request
exports.getShortage=function(req,res){
  var familyId=req.body.familyId;
  models.Shortage.findOne({familyId:familyId},function(err, data){
    if (err) {
      res.send(err)
    }
    if(data){
      res.send(data) 
    }
  })
}

//get user info by a given email
exports.getData=function(req, res){
  models.User.findOne({'email':req.body.email},function(err, data){
    if (err) {
      res.send(err)
    }
    var allData=data
      res.send(allData) 
  })
}

//send finiance data
exports.getFinanceData=function(req, res){
  var state=req.body.state;
  models.Finance.findOne({'familyId':state.id},function(err, data){
    if(data){
      res.send(data);
    }else{
      var newFinance=new models.Finance({
        category:[],
        cost:[],
        familyId:state.id
      });
      newFinance.save(function(err){
        if(err){
          res.send("error in adding new");
        }else{
          res.send(newFinance);
        }
      })
    }
  })
}

//delete shortage item from the shortages model
exports.deleteShortage= function(req, res) {
  var familyId=req.body.familyId;
  var key=req.body.key;
  models.Shortage.findOne({familyId:familyId},function(err,data){
    if(err){
      res.status(500).send(err);
    }else{
        data.needs.splice(key,1);
        data.save(function(err){
      if(err){
       res.status(500).send(err)
       }
      })
      res.status(200).send('success');
    }
  })
}

//update fininace data
exports.editFinanceData=function(req, res){
  var state=req.body.state;
  models.Finance.findOne({'familyId':state.id},function(err, data){
    if(data){
      data.category=state.tableName;
      data.cost=state.tableCost;
      data.save(function(err){
        if(err){
          res.send("error in updating");
        }else{
          res.send("success updating");
        }
      }) 
    }else{
      var newFinance=new models.Finance({
          category:state.tableName,
          cost:state.tableCost,
          familyId:state.id
      });
      newFinance.save(function(err){
        if(err){
          res.send("error in adding new");
        }else{
          res.send("success in adding new");
        }
      })
    }
 })
}
