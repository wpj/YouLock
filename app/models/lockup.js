var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LockupSchema = new Schema({
  description: { type: String, required: true },
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
  createdBy: { type: ObjectId, required: true },
  lockupType: { type: Number, required: true },
  pageViews: { type: Number, default: 0 }
  // addedOn: { type: Date, default: Date.now }
});

// LockupSchema.index({ coordinates: '2d' });

LockupSchema.statics.findInMapArea = function(mapCorners, callback) {
  this.where('location.coordinates').within({ box: mapCorners }).exec(callback);
};

module.exports = mongoose.model('Lockup', LockupSchema);