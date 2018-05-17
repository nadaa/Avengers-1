
var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('supertest');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);



describe('App', function() {

  describe('test Signup request', function() {
    it('Should respond with status 201', function(done) {
      chai.request(app)
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
});