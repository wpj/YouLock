var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LockupSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true},
  // latitude: { type: Number, required: true },
  // longitude: { type: Number, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  rackAmount: { type: Number, required: true },
  createdBy: { type: String, required: true }
  // addedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lockup', LockupSchema);