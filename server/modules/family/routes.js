const appRouter=require('express').Router();
const appControllers=require('./controllers');



appRouter.route('/api/signup').post((req,res)=>{
	// to retreive all family members
	console.log("request received",req.body)
	appControllers.signupUser(req,res);

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
