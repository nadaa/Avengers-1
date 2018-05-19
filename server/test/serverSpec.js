
var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

const mongoose = require('mongoose')
const Users = mongoose.model('User')


describe('Users', () => {
  before(function (done) {
    Users.remove({username:"user1"}, (err) => {
      console.error(err)
      done()
    })
  })
})



describe('App', function() {

  describe('test Signup request', function() {
    it('Should respond with status 201', function(done) {
      chai.request(app)
        .post('/api/signup')
        .send({
              user:{username:"user1",
              password:"123",
              email:"userx@gmail.com",
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
      chai.request(app)
        .post('/api/login')
        .send({
              user:{username:"user1",
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

























});