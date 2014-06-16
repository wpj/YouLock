var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LockupSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, required: true },
    coordinates: [
      { type: Number,
        required: true,
        index: true
      }
    ]
  },
  rackAmount: { type: Number, required: true },
  createdBy: { type: String, required: true }
  // addedOn: { type: Date, default: Date.now }
});

// LockupSchema.index({ coordinates: '2d' });

LockupSchema.statics.findInMapArea = function(mapCorners, callback) {
  this.where('location.coordinates').within({ box: mapCorners }).exec(callback);
};

module.exports = mongoose.model('Lockup', LockupSchema);