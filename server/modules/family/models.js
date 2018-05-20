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
	taskName:String,
	taskDate:{type:Date,default:new Date()},
	completed:{type:Boolean,default:false},
	userEmail:String,
})


const familySchema=new mongoose.Schema({
	// familyRules:String,
	// events:[{}],
	// finance:{},
	jobtitle:String,
   	workaddress:String,
    worknumber:String,
   	worktime:String,
    salary:String,
    familyId:String,
    marriageDate:String,
})

const shortageSchema=new mongoose.Schema({
	room:String,
	need:String,
})

var User=mongoose.model('User',userSchema);
var Task=mongoose.model('Task',taskSchema);
var Family=mongoose.model('Family',familySchema);
var Shortage=mongoose.model('Shortage',shortageSchema);

module.exports={
User:User,
Task:Task,
Family:Family,
Shortage:Shortage,
}

