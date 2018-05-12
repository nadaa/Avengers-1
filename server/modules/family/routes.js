const appRouter=require('express').Router();
const appControllers=require('./controllers');



appRouter.route('/api/user').post((req,res)=>{

	// to retreive all family members
	console.log("a post request is received")
	appControllers.createUser(req,res);
})




module.exports=appRouter;
