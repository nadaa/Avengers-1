
var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

const mongoose = require('mongoose')
const Users = mongoose.model('User')

describe("App Test",function(){
	it('Server connection',function(done){

		 request(app).get('/')
		 .end(function(er,res){
			  expect(res).to.have.status(200);
		      expect(res.body).to.have.property("msg");
		      expect(res.body.msg).to.be.eql("YOU ARE CONECTED TO THE SERVER:)");
		      done()
		 	})
		})
})

after(()=>{
	User.remove({email:'user1@gmail.com'},function(err){
		if(err) console.log(err);
	})

})
describe('test Signup request', function() {
    it('Should respond with status 201', function(done) {
      request(app)
        .post('/api/signup')
        .send({
              user:{username:"user1",
              password:"123",
              email:"user1@gmail.com",
              bdate:"1980-12-17",
              role:"father",
              familyId:1}       
            })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.have.property("msg");
          expect(res.body.msg).to.be.eql("success signup");
          done();
        });
    });
  });

describe('Test Login', function() {
    it('Should respond with status 201', function(done) {
      request(app)
        .post('/api/login')
        .send({
              user:{email:"user1@gmail.com",
              password:"123"                 
            }
          })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.have.property("msg");
          expect(res.body.msg).to.be.eql("success login");
          done();
        });
    });
  });
