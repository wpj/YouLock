var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RecordSchema = new Schema({
  dataType: { type: Number, required: true},
  time: { type: Date, required: true, default: new Date() },
  location: {
    type: { type: String, required: true },
    coordinates: [
      { type: Number,
        required: true,
        index: true
      }
    ]
  }
});

RecordSchema.statics.findInMapArea = function(mapCorners, callback) {
  this.where('location.coordinates').within({ box: mapCorners }).exec(callback);
};

module.exports = mongoose.model('Record', RecordSchema);

// NOTES
// Record types:
//    1 = Lockup pageview
//    2 = Location search coordinates
//    3 = Address search coordinates