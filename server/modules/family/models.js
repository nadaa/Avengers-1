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
	email:String
})


const familySchema=new mongoose.Schema({
	// familyRules:String,
	// events:[{}],
	// finance:{},
	familyId:{type:String, index: { unique: true }},
	jobtitle:String,
   	workaddress:String,
    worknumber:String,
   	worktime:String,
    salary:Number,
    marriageDate:String
})

const shortageSchema=new mongoose.Schema({
	needs:[String],
	familyId:{type:String, index: { unique: true }},
})
const finance=new mongoose.Schema({
	familyId:{type:String, index: { unique: true }},
	category:[[String]],
	cost:[[Number]],
})

var User=mongoose.model('User',userSchema);
var Task=mongoose.model('Task',taskSchema);
var Family=mongoose.model('Family',familySchema);
var Shortage=mongoose.model('Shortage',shortageSchema);
var Finance=mongoose.model('Finance',finance);

module.exports={
User:User,
Task:Task,
Family:Family,
Shortage:Shortage,
Finance:Finance,
}

