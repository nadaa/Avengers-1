const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	email:{
	 type: String, index: { unique: true }
	},
	password: String,
	username:String,
	bdate: Date,
	role: String,
	familyId:String
	
})

const taskSchema=new mongoose.Schema({
	taskName:Date,
	taskCategory:String,
	taskDate:{type:Date,default:new Date()},
	completed:{type:Boolean,default:false},
	userEmail:String,
	familyId:String 
})


const familySchema=new mongoose.Schema({
	familyId:String,
	familyRules:String,
	events:[{}],
	finance:{}
})



var User=mongoose.model('User',userSchema);
var Task=mongoose.model('Task',taskSchema);
var Family=mongoose.model('Family',familySchema);


module.exports={
User:User,
Task:Task,
Family:Family
}

