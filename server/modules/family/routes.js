const appRouter=require('express').Router();
const appControllers=require('./controllers');



appRouter.route('/api/signup').post((req,res)=>{
	// to retreive all family members
	console.log("request received",req.body)
	appControllers.signupUser(req,res);

})
//this for jozaa to check the router is wotk or not
appRouter.route('/').get((req,res)=>{
  // to retreive all family members
  console.log("request received from profile 2222: ",req.body)
  var t={b:'YOU ARE CONECTED TO THE SERVER :)'}
  res.send(t);

})

// appRouter.route('/api/login').post((req,res)=>{
//     //to check the password for the user and start the session 
//     appControllers.signinUser(req,res);

// })
// appRouter.route('/api/login').get((req,res)=>{
//     //to check the password for the user and start the session 
//     console.log('work please')

// })
module.exports=appRouter;
