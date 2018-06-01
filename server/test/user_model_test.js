const chai = require('chai');
const mongoose=require('mongoose');
const mongoDB='mongodb://localhost/homeDb';
mongoose.connect(mongoDB);

const User=require('../modules/family/models').User;
var expect = chai.expect;



describe('user model test',()=>{
it('has a User model',()=>{
	expect(User).to.exist;
})

before(async ()=>{
	await User.remove({});
})

afterEach(async ()=>{
		await User.remove({});
})

after(async ()=>{
 await mongoose.connection.close();
})

describe('get  user',()=>{
	it('get a user',async ()=>{
		const user=new User({username:"user1",
              password:"123",
              email:"user1@gmail.com",
              bdate:"1980-12-17",
              role:"Father",
              familyId:1})       
           
		await user.save();
		var foundUser=await User.findOne({username:'user1'});
		const expected='user1';
		const actual=foundUser.username;
		expect(actual).to.equal(expected);
})
		
})

describe('update user',()=>{
	it('update a user',async ()=>{
		const user=new User({user:{username:"user1",
              password:"123",
              email:"user1@gmail.com",
              bdate:"1980-12-17",
              role:"Father",
              familyId:1}});
		await user.save();

		//const foundUser=User.findOne({email:'user1@gmail.com'});
		user.username='newuser';
		const updateUser=await user.save();
		const expected='newuser';
		const actual=updateUser.username;
		expect(actual).to.equal(expected);
	})

 })

})

