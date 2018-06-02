const mongoose=require('mongoose');

//user schema for user info
const userSchema=new mongoose.Schema({
	email:{ type: String,trim: true,index: { unique: true }},
	password: {type:String, trim: true},
	username:{type:String, trim: true },
	bdate: Date,
	role: {type:String, trim:true},
	familyId:{type:String,trim:true} 
})

//taskSchema to store kids tasks
const taskSchema=new mongoose.Schema({
	taskName:String,
	taskDate:{type:Date,default:new Date()},
	completed:{type:Boolean,default:false},
	email:String
})

//familySchema to store family
const familySchema=new mongoose.Schema({
	familyId:{type:String, index: { unique: true }},
	jobtitle:String,
	workaddress:String,
	worknumber:String,
	worktime:String,
	salary:{type:Number,default:0},
	marriageDate:String
})

//shortageSchema to store shortages
const shortageSchema=new mongoose.Schema({
	needs:{type:[String],default:[]},
	familyId:{type:String, index: { unique: true }},
})

//finianceSchema to store finiance data
const finance=new mongoose.Schema({
	familyId:{type:String, index: { unique: true }},
	category:[[String]],
	cost:[[Number]],
})

var User    =mongoose.model('User',userSchema);
var Task    =mongoose.model('Task',taskSchema);
var Family  =mongoose.model('Family',familySchema);
var Shortage=mongoose.model('Shortage',shortageSchema);
var Finance =mongoose.model('Finance',finance);

module.exports={
  User:User,
  Task:Task,
  Family:Family,
  Shortage:Shortage,
  Finance:Finance,
}

