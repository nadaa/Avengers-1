const appRouter=require('express').Router();
const appControllers=require('./controllers');



appRouter.route('/api/signup').post((req,res)=>{
	// to retreive all family members
	// console.log("request received",req.body)
	appControllers.signupUser(req,res);

})
//this for jozaa to check the router is wotk or not
appRouter.route('/').get((req,res)=>{
  // to retreive all family members
  console.log("request received from profile 2222: ",req.body)
  var t={b:'YOU ARE CONECTED TO THE SERVER :)'}
  res.send(t);

})

appRouter.route('/api/login').post((req,res)=>{
	console.log('inside',req.body)
    //to check the password for the user and start the session 
    appControllers.signinUser(req,res);

  })


appRouter.route('/api/getkids/:familyid').get((req,res)=>{
  //console.log(req.params.familyid);
  appControllers.getAllKids(req,res);

})


appRouter.route('/api/setkidtask').post((req,res)=>{
  //console.log("received setkidtask",req.body);
  appControllers.setKidTask(req,res);

})

appRouter.route('/api/gettasks').post((req,res)=>{
  //console.log("received getkidtasks");
  appControllers.getTasks(req,res);

})

appRouter.route('/api/confirmtask').post((req,res)=>{
  console.log(req.body.tasks)
  appControllers.confirmTask(req,res);
})


appRouter.route('/api/toggletask').post((req,res)=>{
  console.log("receieved tasks toggle");
  appControllers.toggleTask(req,res);
})

appRouter.route('/api/userinfo').post((req,res)=>{
  appControllers.sendUserInfo(req,res);
})




appRouter.route('/getkids').post((req,res)=>{
  var email=req.body.user
  appControllers.getKidsNames(email,res);

});

appRouter.route('/api/getkidsid').post((req,res)=>{

 appControllers.getKidsId(req,res);

});

appRouter.route('/api/shortage').post((req,res)=>{
  appControllers.sendShortage(req,res);
})

appRouter.route('/api/shortage').get((req,res)=>{
  appControllers.getShortage(req,res);
})
appRouter.route('/api/shortage/delete').post((req,res)=>{
  appControllers.deleteShortage(req,res);
})
// //for test jozaa
// appRouter.route('/login2').post((req,res)=>{
//   console.log('CALL LOGIN 2 FROM SERVER');
//   //to check the password for the user and start the session 
//   appControllers.signinUser2(req,res);
// })

//for test jozaa get the data
appRouter.route('/getData').post((req,res)=>{
  // console.log('CALL GET DATA 2 FROM SERVER');
  appControllers.getData(req,res);
})

module.exports=appRouter;
