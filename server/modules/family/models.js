const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
	email:{
	 type: String, index: { unique: true }
	},
	password: String,
	name:String,
	bdate: Date,
	role: String,
	rank: {type:Number,default:0}
	
})

const taskSchema=new mongoose.Schema({
	taskName:Date,
	taskCategory:String,
	taskDate:Date,
	taskTime:Date,
	status:String,
	userEmail:String 
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

