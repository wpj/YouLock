var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LockupSchema = new Schema({
  name: String,
  address: String,
  coordinates: String,
  rackAmount: Number,
  createdBy: String
  // addedOn: Date
});

module.exports = mongoose.model('Lockup', LockupSchema);