var should = require('should'),
    assert = require('assert'),
    request = require('supertest')

describe('Lockup REST API', function(){

  var url = 'http://localhost:8080/api';

  // before(function(done) {
  //   mongoose.connect('mongodb://localhost:rack-api');
  //   var db = mongoose.connection;
  //   // db.on('error', console.error.bind(console, 'connection error:'));
  //   done();
  // });

  it('should create a Lockup', function(done) {
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
      .end(function(err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      });
  });

});