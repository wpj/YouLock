var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    expect = require('expect.js'),
    _ = require('lodash'),
    mongoose = require('mongoose')
    Lockup = require('../app/models/lockup');

    var db = mongoose.connect('mongodb://localhost:lockup-api');

describe('Lockup REST API', function(){

  var url = 'http://localhost:8080/api';

  beforeEach(function(done) {
    for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function(){});
    };
    console.log("Collections removed!");
   done();
  });

  // before(function(done) {
  //   mongoose.connect('mongodb://localhost:rack-api');
  //   var db = mongoose.connection;
  //   // db.on('error', console.error.bind(console, 'connection error:'));
  //   done();
  // });

  it('should create a Lockup when POSTing to /api/lockups', function(done) {
    var lockup = {
      name: '20 Exchange Pl',
      address: '20 Exchange Pl, NYC',
      coordinates: '-74.000776, 40.71532',
      rackAmount: "2",
      createdBy: 'NYCDOT'
    };

    request(url)
      .post('/lockups')
      .send(lockup)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) throw err;
        res.body.name.should.eql('20 Exchange Pl');
        done();
      });
  });

  // it('should display all Lockups when sending GET requests to /api/lockups', function(done) {

  // });

});