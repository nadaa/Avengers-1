const appRouter=require('express').Router();
const appControllers=require('./controllers');



appRouter.route('/api/signup').post((req,res)=>{

	// to retreive all family members
	console.log("a post request is received")
	appControllers.signupUser(req,res);
})



appRouter.route('/api/login').post((req,res)=>{
    //to check the password for the user and start the session 
    appControllers.signinUser(req,res);

})

module.exports=appRouter;
