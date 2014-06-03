var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    expect = require('expect.js'),
    mongoose = require('mongoose')
    Lockup = require('../app/models/lockup');

    var db = mongoose.connect('mongodb://localhost:lockup-api');

describe('Lockup REST API', function(){

  var url = 'http://localhost:8080/api';

  describe('requests to /api/lockups', function() {

    afterEach(function(done) {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function(){});
      };
     done();
    });

    it('should create a Lockup when sending a POST request', function(done) {
      var lockup = {
        name: '20 Exchange Pl',
        address: '20 Exchange Pl, NYC',
        coordinates: '-74.000776, 40.71532',
        rackAmount: "2",
        createdBy: 'NYCDOT'
        // addedOn: Date.now
      };

      request(url)
        .post('/lockups')
        .send(lockup)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          // debugger;
          (res.body.name).should.eql('20 Exchange Pl');
          done();
        });
    });

    it('should display all Lockups when sending GET requests', function(done) {

      Lockup.create({
        name: '20 Exchange Pl',
        address: '20 Exchange Pl, NYC',
        coordinates: '-74.000776, 40.71532',
        rackAmount: "2",
        createdBy: 'NYCDOT',
        addedOn: Date.now
      }, function(err, lockup) {
        if (err) throw err;
        // console.log(lockup);
      });

      request(url)
        .get('/lockups')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          // console.log(res.body);
          // expect(res.body.length).to.eql(1);
          expect(res.body[0].name).to.eql('20 Exchange Pl');
          done();
        });
    });
  });

  describe('requests to /api/lockups/:lockup_id', function() {

    var id;

    before(function(done) {

      Lockup.create({
        name: '20 Exchange Pl',
        address: '20 Exchange Pl, NYC',
        coordinates: '-74.000776, 40.71532',
        rackAmount: "2",
        createdBy: 'NYCDOT'
      }, function(err, lockup) {

        if (err) throw err;
        id = lockup._id;
        done();
      });
    });

    it('should display the information of the resource the corresponds to the id in the parameters', function(done) {

      request(url)
        .get('/lockups/' + id)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          expect(res.body.name).to.eql('20 Exchange Pl');
          // console.log(res.body);
          done();
        });
    });

    it('should update the information of the resource corresponding to the id in the params', function(done) {

      var updatedLockup = {
        name: '50 1st Ave',
        address: '50 1st Ave, NYC',
        coordinates: '-74.000776, 40.71532',
        rackAmount: "2",
        createdBy: 'USER'
      }

      request(url)
        .put('/lockups/' + id)
        .send(updatedLockup)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body.message).to.eql('Lockup updated!');
          done();
        });
    });

    it('should dislay the updated information of the right resource', function(done) {

      request(url)
        .get('/lockups/' + id)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body.name).not.to.eql('20 Exchange Pl');
          expect(res.body.name).to.eql('50 1st Ave');
          done();
        });
    });

    it('should delete the resource that corresponds to the id in params', function(done) {
      request(url)
        .delete('/lockups/' + id)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body.message).to.eql('Lockup successfully deleted');
        });

      request(url)
        .get('/lockups')
        .end(function(err, res) {
          if (err) throw err;
          expect(res.body).to.be.empty;
          done();
        });
    });

  });

});