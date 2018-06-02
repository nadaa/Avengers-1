const appRouter=require('express').Router();
const appControllers=require('./controllers');


appRouter.route('/').get((req,res)=>{
  var t={msg:'YOU ARE CONECTED TO THE SERVER:)'}
  res.status(200).send(t);
})

appRouter.route('/api/signup').post((req,res)=>{
	appControllers.signupUser(req,res);
})

appRouter.route('/api/signup').post((req,res)=>{
	appControllers.signupUser(req,res);
})

appRouter.route('/api/login').post((req,res)=>{
  appControllers.signinUser(req,res);
})

appRouter.route('/api/getkids/:familyid').get((req,res)=>{
  appControllers.getAllKids(req,res);
})

appRouter.route('/api/setkidtask').post((req,res)=>{
  appControllers.setKidTask(req,res);
})

appRouter.route('/api/gettasks').post((req,res)=>{
  appControllers.getTasks(req,res);
})

appRouter.route('/api/confirmtask').post((req,res)=>{
  appControllers.confirmTask(req,res);
})

appRouter.route('/api/toggletask').post((req,res)=>{
  appControllers.toggleTask(req,res);
})

appRouter.route('/api/userinfo').post((req,res)=>{
  appControllers.sendUserInfo(req,res);
})

appRouter.route('/api/getkids').post((req,res)=>{
  var email=req.body.user;
  appControllers.getKidsNames(email,res);
});

appRouter.route('/api/getkidsid').post((req,res)=>{
  appControllers.getKidsId(req,res);
});


appRouter.route('/api/addshortage').post((req,res)=>{
  appControllers.sendShortage(req,res);
})

appRouter.route('/api/getshortage').post((req,res)=>{
  appControllers.getShortage(req,res);
})

appRouter.route('/api/deleteshortage').post((req,res)=>{
  console.log(req.body)
   appControllers.deleteShortage(req,res);
})

appRouter.route('/api/getData').post((req,res)=>{
  appControllers.getData(req,res);
})

appRouter.route('/api/getfinancedata').post((req,res)=>{
  appControllers.getFinanceData(req,res);
})

appRouter.route('/api/editfinancedata').post((req,res)=>{
  appControllers.editFinanceData(req,res);
})


module.exports=appRouter;
